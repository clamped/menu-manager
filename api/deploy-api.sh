#!/usr/bin/env bash

set -ex

pushd $(pwd)

command -v aws || { echo "I require aws but it's not installed. Aborting." >&2; exit 1; }

if [[ $PWD = */api ]]; then cd ..; fi;

npm install

aws cloudformation package \
    --template-file ./api/deploy-api.yaml \
    --output-template-file ./api/serverless-api-output.yaml \
    --s3-bucket menu-manager-api

aws cloudformation deploy \
   --template-file ./api/serverless-api-output.yaml \
   --stack-name menu-manager-api \
   --capabilities CAPABILITY_IAM

popd

exit 0
