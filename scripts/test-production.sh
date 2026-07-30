#!/data/data/com.termux/files/usr/bin/bash

BASE="http://localhost:3000"

echo "=============================="
echo " Underkutters Production Check"
echo "=============================="

check() {
  NAME=$1
  URL=$2

  echo ""
  echo "Testing $NAME..."
  
  RESPONSE=$(curl -s -o /tmp/uk_response -w "%{http_code}" "$URL")

  if [ "$RESPONSE" = "200" ]; then
      echo "✅ $NAME OK ($RESPONSE)"
  else
      echo "❌ $NAME FAILED ($RESPONSE)"
      cat /tmp/uk_response
  fi
}

check "Health" "$BASE/health"
check "Data API" "$BASE/api/data"
check "Profit Engine" "$BASE/api/profit"
check "Jobs API" "$BASE/api/jobs"

echo ""
echo "=============================="
echo " Production Check Complete"
echo "=============================="
