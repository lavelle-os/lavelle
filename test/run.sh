#!/usr/bin/env bash
# run.sh runs the installer end to end with an invented shop and no network, and says what passed.
# Every name and number in test/ is made up. A veteran would call this a smoke test with piped
# stdin and find it ordinary. The owner's choice in it: the transfer-loop refusal is tested on
# purpose, because a refusal that nobody has seen fire is a refusal nobody trusts.
set -u
cd "$(dirname "$0")/.."
export LAVELLE_HOME="$(mktemp -d)/lavelle"
pass=0; fail=0
ok()   { echo "pass: $1"; pass=$((pass+1)); }
bad()  { echo "FAIL: $1"; fail=$((fail+1)); }

echo "== lavelle init, piped answers, invented shop"
if bin/lavelle init < test/answers-init.txt > /tmp/lavelle-init.out 2>&1; then ok "init exited 0"; else bad "init exited non-zero (see /tmp/lavelle-init.out)"; fi
[ -f "$LAVELLE_HOME/owner.md" ] && ok "owner.md written" || bad "owner.md missing"
[ -f "$LAVELLE_HOME/lavelle.json" ] && ok "lavelle.json written" || bad "lavelle.json missing"
grep -q '^level$' "$LAVELLE_HOME/owner.md" && ok "check-in recorded as one word" || bad "check-in line missing"
node -e "
const d=JSON.parse(require('fs').readFileSync(process.env.LAVELLE_HOME+'/lavelle.json','utf8'));
const f=d.fields; const blocking=Object.values(f).filter(x=>x.blocking);
const answered=blocking.filter(x=>x.how==='answered').length;
if(answered!==blocking.length||blocking.length===0){console.log('blocking answered',answered,'of',blocking.length);process.exit(1)}
if(f['area.definition'].answer!=='a list of city names the shop covers')process.exit(2);
if(f['voice.mirroring'].how!=='default')process.exit(3);
" && ok "17 blocking answered, one topic on defaults" || bad "lavelle.json contents wrong (exit $?)"

echo "== lavelle init again without --again must refuse"
if bin/lavelle init < /dev/null > /tmp/lavelle-init2.out 2>&1; then bad "second init did not refuse"; else ok "second init refused, nothing changed"; fi

echo "== lavelle doctor"
if bin/lavelle doctor > /tmp/lavelle-doctor.out 2>&1; then ok "doctor exited 0"; else bad "doctor exited non-zero"; fi
grep -Eq 'blocking answered +ok +17 of 17' /tmp/lavelle-doctor.out && ok "doctor sees 17 of 17 blocking" || bad "doctor does not report blocking ok"

echo "== lavelle add phone --dry-run (agent 5550199, transfer 5550100 from the bank answer)"
printf '5550199\n2\n' | bin/lavelle add phone --dry-run > /tmp/lavelle-phone.out 2>&1 && ok "dry run exited 0" || bad "dry run exited non-zero"
grep -q 'Nothing was created' /tmp/lavelle-phone.out && ok "dry run created nothing" || bad "dry run did not say so"
grep -q 'Northgate Appliance Service' /tmp/lavelle-phone.out && ok "business name passed through" || bad "business name missing from dry run"

echo "== transfer-loop refusal: agent number equals transfer number"
node -e "
const p=process.env.LAVELLE_HOME+'/lavelle.json';const fs=require('fs');const d=JSON.parse(fs.readFileSync(p,'utf8'));
delete d.phone_module; fs.writeFileSync(p,JSON.stringify(d,null,2));"
if printf '5550100\n1\n' | bin/lavelle add phone --dry-run > /tmp/lavelle-loop.out 2>&1; then bad "loop was NOT refused"; else ok "loop refused (exit non-zero)"; fi
grep -q 'forward back into the agent forever' /tmp/lavelle-loop.out && ok "refusal says why" || bad "refusal reason missing"

echo
echo "$pass passed, $fail failed. Install folder for inspection: $LAVELLE_HOME"
[ "$fail" -eq 0 ]
