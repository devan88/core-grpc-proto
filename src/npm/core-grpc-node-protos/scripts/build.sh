#!/bin/bash
cd /protos;
mkdir -p /build/protos
output_dir="/build/protos";
# grpc-js
# JavaScript code generating
grpc_tools_node_protoc \
    --plugin=protoc-gen-grpc=/build/node_modules/.bin/grpc_tools_node_protoc_plugin \
    --js_out="import_style=commonjs,binary:$output_dir" \
    --grpc_out="grpc_js:$output_dir" \
    ./notifications/*.proto

grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=/build/node_modules/.bin/protoc-gen-ts \
    --ts_out="grpc_js:$output_dir" \
    ./notifications/*.proto