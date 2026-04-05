#!/usr/bin/env sh
set -eu
git config core.hooksPath .githooks
echo "Installed repo-managed hooks (.githooks)"
