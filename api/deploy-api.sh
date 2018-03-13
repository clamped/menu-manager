#!/usr/bin/env bash

set -ex

pushd $(pwd)

command -v aws || { echo "I require aws but it's not installed. Aborting." >&2; exit 1; }

if [[ $PWD != */api ]]; then cd api; fi;

npm install

zip -r menu-manager-api.zip index.js node_modules/**

aws s3 cp menu-manager-api.zip s3://menu-manager-api/menu-manager-api.zip

aws cloudformation package \
    --template-file ./deploy-api.yaml \
    --output-template-file ./serverless-api-output.yaml \
    --s3-bucket menu-manager-api

aws cloudformation deploy \
   --template-file ./serverless-api-output.yaml \
   --stack-name menu-manager-api \
   --capabilities CAPABILITY_IAM

popd

exit 0
