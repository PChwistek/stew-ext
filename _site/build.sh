#!/usr/bin/env bash
cp README.md stew_dist/

rm stew_dist.zip
(cd stew_dist/ && zip -r stew_dist *)
mv stew_dist/stew_dist.zip .