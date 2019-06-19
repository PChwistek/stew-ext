#!/usr/bin/env bash
cp README.md dist/

rm tomato-clock.zip
(cd dist/ && zip -r hermitly *)
mv dist/hermitly.zip .