#!/bin/sh

INDEX_FILE="/usr/share/nginx/html/index.html"
# INDEX_FILE="./index.html" # for dev I leave it here

# Use sed to replace the __SERVER_DATA__ placeholder
sed -i '' "s|'__SERVER_DATA__'|{VITE_ENV:\"${VITE_ENV}\"}|g" "$INDEX_FILE"


# Start NGINX
nginx -g "daemon off;"
