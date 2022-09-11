#!/bin/bash

# `$*` expands the `args` supplied in an `array` individually
# or splits `args` in a string separated by whitespace.
sh -c "echo $*"
next_version=$(git-semver $INPUT_CURRENT_VERSION $INPUT_CURRENT_BRANCH $INPUT_CURRENT_COMMIT)
echo "::set-output name=next_version::$next_version"