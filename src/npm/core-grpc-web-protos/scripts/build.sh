#!/bin/bash
mkdir -p ./protos
output_dir="./protos";
grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --js_out="import_style=commonjs,binary:$output_dir" \
    --ts_out="service=grpc-web:$output_dir" \
    -I /protos \
    /protos/**/*.proto