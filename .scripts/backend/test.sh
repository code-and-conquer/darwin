#!/usr/bin/env bash
set -aeu
source .config/build

OLD_DIR=$PWD
cd $BE_SOURCE

NODE_ENV=test npm run test

cd $OLD_DIR

exit 0