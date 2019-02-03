#!/usr/bin/env bash

set -ex

NOW=`date +%s`
ZIP_NAME=menu-manager-api-$NOW.zip
S3_BUCKET=menu-manager-api
INFRA_TEMPLATE=infrastructure/deploy-api.yaml
OUTPUT_TEMPLATE=target/serverless-api-output.yaml

pushd $(pwd)

command -v aws || { echo "I require aws but it's not installed. Aborting." >&2; exit 1; }
command -v gsed || { echo "I require gsed but it's not installed. Aborting." >&2; exit 1; }

mkdir target

yarn install

zip -r target/$ZIP_NAME src/index.js node_modules/**

aws s3 cp target/$ZIP_NAME s3://$S3_BUCKET/$ZIP_NAME

gsed -i "s/CodeUri:.*/CodeUri: s3:\/\/${S3_BUCKET}\/${ZIP_NAME}/g" $INFRA_TEMPLATE

aws cloudformation package \
    --template-file $INFRA_TEMPLATE \
    --output-template-file $OUTPUT_TEMPLATE \
    --s3-bucket menu-manager-api

aws cloudformation deploy \
   --template-file $OUTPUT_TEMPLATE \
   --stack-name menu-manager-api \
   --capabilities CAPABILITY_IAM

exit 0
