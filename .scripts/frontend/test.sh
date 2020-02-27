#!/usr/bin/env bash
set -aeu
source .config/build

OLD_DIR=$PWD
cd $FE_SOURCE

NODE_ENV=test CI=true npm run test

cd $OLD_DIR

exit 0