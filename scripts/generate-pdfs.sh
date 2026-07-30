#!/bin/bash
# Regenerate the branded resource PDFs from the /resources/[slug]/print
# routes. Requires the dev server on :3000 and Chrome installed.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SLUGS=$(node -e "require('ts-node');" 2>/dev/null; grep -o 'slug: "[a-z-]*"' lib/resources.ts | sed 's/slug: "//;s/"//')
for slug in $SLUGS; do
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="public/downloads/${slug}.pdf" \
    --virtual-time-budget=10000 \
    "http://localhost:3000/resources/${slug}/print" 2>/dev/null
  echo "generated: ${slug}.pdf"
done
