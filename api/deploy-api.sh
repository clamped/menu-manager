#!/usr/bin/env bash

set -ex

command -v aws || { echo "I require aws but it's not installed. Aborting." >&2; exit 1; }

aws cloudformation package \
    --template-file ./deploy-api.yaml \
    --output-template-file ./serverless-api-output.yaml \
    --s3-bucket menu-manager-api

exit 0