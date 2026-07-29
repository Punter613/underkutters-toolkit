#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PRO STABILIZER"

mkdir -p backups/stable
mkdir -p data/jobs
mkdir -p reports/pdf
mkdir -p reports/csv
mkdir -p public/uploads

cp server.js backups/stable/server.js.$(date +%s)
cp -r routes backups/stable/routes.$(date +%s)
cp -r services backups/stable/services.$(date +%s)

echo "[]" > data/jobs.json

cat > data/settings.json <<JSON
{
 "company":"Underkutters Inc",
 "version":"PRO-1",
 "currency":"USD",
 "tax":0,
 "status":"production"
}
JSON

node --check server.js

for f in routes/*.js services/*.js public/js/*.js; do
    [ -f "$f" ] && node --check "$f" 2>/dev/null
done

pkill -f "node server.js" 2>/dev/null

nohup node server.js > server.log 2>&1 &

sleep 2

echo ""
echo "SERVER TEST"
curl -s http://localhost:3000/api/jobs

echo ""
echo ""
echo "🔥 UNDERKUTTERS PRO FOUNDATION LOCKED"

