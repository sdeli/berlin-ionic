#!/bin/sh

if [ -z "$VITE_ENV" ]; then
  echo "Error: VITE_ENV is not set."
  exit 1
fi

INDEX_FILE="/usr/share/nginx/html/index.html"
# INDEX_FILE="./index.html" # for dev I leave it here

# Use sed to replace the __SERVER_DATA__ placeholder
sed -i "s|'__SERVER_DATA__'|{VITE_ENV:\"${VITE_ENV}\", VITE_URL:\"${VITE_URL}\"}|g" "$INDEX_FILE"

exec nginx -g "daemon off;"