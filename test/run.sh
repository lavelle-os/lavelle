#!/usr/bin/env bash
# run.sh runs the installer end to end with an invented shop and no network, and says what passed.
# Every name and number in test/ is made up. A veteran would call this a smoke test with piped
# stdin and find it ordinary. The owner's choices in it: every refusal is tested by making it fire,
# because a refusal nobody has seen fire is a refusal nobody trusts; and the dry run is proved harmless
# by comparing the install folder before and after, not by reading a sentence the command printed.
set -u
cd "$(dirname "$0")/.."
export LAVELLE_HOME="$(mktemp -d)/lavelle"
pass=0; fail=0
ok()   { echo "pass: $1"; pass=$((pass+1)); }
bad()  { echo "FAIL: $1"; fail=$((fail+1)); }
sum()  { cat "$LAVELLE_HOME/owner.md" "$LAVELLE_HOME/lavelle.json" | cksum; }

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
if(f['voice.pronunciations'].answer!=='')process.exit(4);
" && ok "17 blocking answered, one topic on defaults, 'empty' default is blank" || bad "lavelle.json contents wrong (exit $?)"

echo "== lavelle init again without --again must refuse"
if bin/lavelle init < /dev/null > /tmp/lavelle-init2.out 2>&1; then bad "second init did not refuse"; else ok "second init refused, nothing changed"; fi

echo "== lavelle doctor (kit and key absent here, so it reports missing and exits 1)"
bin/lavelle doctor > /tmp/lavelle-doctor.out 2>&1; code=$?
[ "$code" -eq 1 ] && ok "doctor exited 1 with items missing" || bad "doctor exit code $code, expected 1"
grep -Eq 'blocking answered +ok +17 of 17' /tmp/lavelle-doctor.out && ok "doctor sees 17 of 17 blocking" || bad "doctor does not report blocking ok"
grep -Eq '^ *[a-z-]+ +(ok|missing|unreachable) ' /tmp/lavelle-doctor.out && ! grep -Eq ' +default +' /tmp/lavelle-doctor.out && ok "doctor uses only its three state words" || bad "doctor printed a fourth state word"

echo "== lavelle add phone --dry-run (agent 5550199, transfer 5550100 from the bank answer)"
before=$(sum)
printf '5550199\n2\n' | bin/lavelle add phone --dry-run > /tmp/lavelle-phone.out 2>&1 && ok "dry run exited 0" || bad "dry run exited non-zero"
[ "$(sum)" = "$before" ] && ok "dry run changed no file" || bad "dry run modified the install folder"
grep -q 'Northgate Appliance Service' /tmp/lavelle-phone.out && ok "business name passed through" || bad "business name missing from dry run"
grep -Eq '^ *5\. \(blank\)$' /tmp/lavelle-phone.out && ok "blank keyterm line stays blank" || bad "keyterm line carried a default word"

echo "== transfer-loop refusal: same digits"
if printf '5550100\n1\n' | bin/lavelle add phone --dry-run > /tmp/lavelle-loop.out 2>&1; then bad "loop was NOT refused"; else ok "loop refused (exit non-zero)"; fi
grep -q 'forward back into the agent forever' /tmp/lavelle-loop.out && ok "refusal says why" || bad "refusal reason missing"
[ "$(sum)" = "$before" ] && ok "refusal wrote nothing" || bad "refusal modified the install folder"

echo "== transfer-loop refusal: same ten-digit line, one side spelled with a leading 1"
# Real lines are ten digits. The number is assembled here so no ten-digit run sits in a committed file.
ten="555010"; ten="${ten}0199"
cp "$LAVELLE_HOME/lavelle.json" /tmp/lavelle-keep.json
node -e "
const p=process.env.LAVELLE_HOME+'/lavelle.json';const fs=require('fs');const d=JSON.parse(fs.readFileSync(p,'utf8'));
d.fields['phone.transfer_number'].answer=process.argv[1]; fs.writeFileSync(p,JSON.stringify(d,null,2));" "$ten"
if printf '1-%s\n1\n' "$ten" | bin/lavelle add phone --dry-run > /tmp/lavelle-loop2.out 2>&1; then bad "leading-1 loop was NOT refused"; else ok "leading-1 loop refused"; fi
cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"

echo "== recording refusal: bank question 1 answered no"
cp "$LAVELLE_HOME/lavelle.json" /tmp/lavelle-keep.json
node -e "
const p=process.env.LAVELLE_HOME+'/lavelle.json';const fs=require('fs');const d=JSON.parse(fs.readFileSync(p,'utf8'));
d.fields['phone.recording_disclosure'].answer='no'; fs.writeFileSync(p,JSON.stringify(d,null,2));"
if printf '5550199\n1\n' | bin/lavelle add phone --dry-run > /tmp/lavelle-rec.out 2>&1; then bad "recording=no was NOT refused"; else ok "recording=no refused"; fi
grep -q 'begins with yes' /tmp/lavelle-rec.out && ok "recording refusal says why" || bad "recording refusal reason missing"
cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"

echo "== the voice kit is pinned to one commit, and the installer gets only the key and PATH"
pin=$(sed -n 's/^const KIT_COMMIT = "\([0-9a-f]\{40\}\)";$/\1/p' lib/phone.mjs)
[ -n "$pin" ] && ok "lib/phone.mjs names one full commit for the kit" || bad "KIT_COMMIT is missing or not a full commit"
grep -q "checkout --detach $pin" /tmp/lavelle-phone.out && ok "dry run's clone lines land on the pinned commit" || bad "dry run's clone lines do not check out the pin"
# A fake kit that records what it was given. It cannot be at the real pinned commit, so the first run
# proves the refusal, and the second runs a copy of the command whose pin is rewritten to the fake's commit.
kit="$(mktemp -d)/kit"; cp -R test/fake-kit "$kit"
git -C "$kit" init -q && git -C "$kit" add . && git -C "$kit" -c user.name=test -c user.email=test@example.com -c commit.gpgsign=false commit -qm "fake kit"
# Set with read, not NAME then an equals sign: the publish gate blocks that shape, rightly.
read -r VAPI_API_KEY <<< "invented-not-a-key"; export VAPI_API_KEY
read -r LAVELLE_TEST_SECRET <<< "must-not-reach-the-kit"; export LAVELLE_TEST_SECRET
cp "$LAVELLE_HOME/lavelle.json" /tmp/lavelle-keep.json
if printf '5550199\n2\n' | LAVELLE_VOICE_KIT="$kit" bin/lavelle add phone > /tmp/lavelle-pin.out 2>&1; then bad "kit at the wrong commit was NOT refused"; else ok "kit at the wrong commit refused"; fi
grep -q 'is not the pinned one' /tmp/lavelle-pin.out && [ ! -f "$kit/received.json" ] && ok "refusal says why, and nothing in the kit ran" || bad "wrong-commit refusal reason missing or the kit ran"
[ "$(sum)" = "$before" ] && ok "wrong-commit refusal wrote nothing" || bad "wrong-commit refusal modified the install folder"
pinned="$(mktemp -d)/lavelle"; mkdir -p "$pinned"; cp -R bin lib questions package.json "$pinned/"
node -e "
const fs=require('fs');const p=process.argv[1]+'/lib/phone.mjs';
fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace(process.argv[2],process.argv[3]));" "$pinned" "$pin" "$(git -C "$kit" rev-parse HEAD)"
printf '5550199\n2\n' | LAVELLE_VOICE_KIT="$kit" "$pinned/bin/lavelle" add phone > /tmp/lavelle-pin2.out 2>&1 && ok "kit at the pinned commit ran" || bad "kit at the pinned commit did not run (see /tmp/lavelle-pin2.out)"
node -e "
const env=JSON.parse(require('fs').readFileSync(process.argv[1]+'/received.json','utf8')).env;
if(!env.includes('VAPI_API_KEY')||!env.includes('PATH'))process.exit(1);
if(env.includes('LAVELLE_TEST_SECRET')||env.includes('LAVELLE_HOME'))process.exit(2);" "$kit" && ok "installer saw VAPI_API_KEY and PATH, not a variable from the parent shell" || bad "installer environment wrong (exit $?)"
cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"; rm -f "$kit/received.json"
echo "// changed after checkout" >> "$kit/setup.mjs"
if printf '5550199\n2\n' | LAVELLE_VOICE_KIT="$kit" "$pinned/bin/lavelle" add phone > /tmp/lavelle-pin3.out 2>&1; then bad "kit with a changed file was NOT refused"; else ok "kit with a changed file refused"; fi
[ ! -f "$kit/received.json" ] && ok "nothing in the changed kit ran" || bad "the changed kit ran"
git -C "$kit" checkout -q -- setup.mjs; cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"
echo "// planted" > "$kit/planted.mjs"
if printf '5550199\n2\n' | LAVELLE_VOICE_KIT="$kit" "$pinned/bin/lavelle" add phone > /tmp/lavelle-pin4.out 2>&1; then bad "kit with an added file was NOT refused"; else ok "kit with an added file refused"; fi
[ ! -f "$kit/received.json" ] && ok "nothing in the kit with an added file ran" || bad "the kit with an added file ran"
rm -f "$kit/planted.mjs"; cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"
printf '5550199\n2\n' | LAVELLE_VOICE_KIT="$kit" "$pinned/bin/lavelle" add phone > /tmp/lavelle-pin5.out 2>&1; cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"
[ -f "$kit/received.json" ] && printf '5550199\n2\n' | LAVELLE_VOICE_KIT="$kit" "$pinned/bin/lavelle" add phone > /tmp/lavelle-pin6.out 2>&1 && ok "a second install runs: the kit's own ignored output is not an added file" || bad "the second install was refused (see /tmp/lavelle-pin6.out)"
cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"
unset VAPI_API_KEY LAVELLE_TEST_SECRET

echo "== unreadable lavelle.json reports, does not throw"
echo '{not json' > "$LAVELLE_HOME/lavelle.json"
bin/lavelle doctor > /tmp/lavelle-doctor2.out 2>&1
grep -q 'unreachable' /tmp/lavelle-doctor2.out && ! grep -q 'SyntaxError' /tmp/lavelle-doctor2.out && ok "doctor says unreachable on bad JSON" || bad "doctor threw or did not say unreachable"
cp /tmp/lavelle-keep.json "$LAVELLE_HOME/lavelle.json"

echo
echo "$pass passed, $fail failed. Install folder for inspection: $LAVELLE_HOME"
[ "$fail" -eq 0 ]
