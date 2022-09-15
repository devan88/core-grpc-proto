#!/bin/bash
mkdir -p ./protos
output_dir="./protos";
# grpc-js
# JavaScript code generating
grpc_tools_node_protoc \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    --js_out="import_style=commonjs,binary:$output_dir" \
    --grpc_out="grpc_js:$output_dir" \
    -I /protos \
    /protos/**/*.proto

grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out="grpc_js:$output_dir" \
     -I /protos \
    /protos/**/*.proto