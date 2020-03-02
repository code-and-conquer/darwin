#!/usr/bin/env bash
set -aeu
source .config/build

OLD_DIR=$PWD
cd $FE_SOURCE

npm run start

cd $OLD_DIR

exit 0