#!/usr/bin/env bash
set -aeu
source .config/build

OLD_DIR=$PWD
cd $BE_SOURCE

NODE_ENV=production npm run build

cd $OLD_DIR

exit 0