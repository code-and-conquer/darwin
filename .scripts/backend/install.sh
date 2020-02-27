#!/usr/bin/env bash
set -e

source .config/build

cd $BE_SOURCE

yarn install --frozen-lockfile

exit 0