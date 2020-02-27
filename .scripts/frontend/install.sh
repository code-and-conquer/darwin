#!/usr/bin/env bash
set -e

source .config/build

cd $FE_SOURCE

yarn install --frozen-lockfile

exit 0