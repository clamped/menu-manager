#!/usr/bin/env bash

set -ex

NOW=`date +%s`
ZIP_NAME=menu-manager-api-$NOW.zip
S3_BUCKET=menu-manager-api

pushd $(pwd)

command -v aws || { echo "I require aws but it's not installed. Aborting." >&2; exit 1; }
command -v gsed || { echo "I require gsed but it's not installed. Aborting." >&2; exit 1; }

if [[ $PWD != */api ]]; then cd api; fi;

mkdir target

npm install

zip -r target/$ZIP_NAME index.js node_modules/**

aws s3 cp target/$ZIP_NAME s3://$S3_BUCKET/$ZIP_NAME

gsed -i "s/CodeUri:.*/CodeUri: s3:\/\/${S3_BUCKET}\/${ZIP_NAME}/g" deploy-api.yaml

aws cloudformation package \
    --template-file ./deploy-api.yaml \
    --output-template-file ./target/serverless-api-output.yaml \
    --s3-bucket menu-manager-api

aws cloudformation deploy \
   --template-file ./target/serverless-api-output.yaml \
   --stack-name menu-manager-api \
   --capabilities CAPABILITY_IAM

popd

exit 0
