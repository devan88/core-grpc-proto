#!/bin/bash
cd /protos;
mkdir -p /build/protos
output_dir="/build/protos";
grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=/build/node_modules/.bin/protoc-gen-ts \
    --js_out="import_style=commonjs,binary:$output_dir" \
    --ts_out="service=grpc-web:$output_dir" \
    ./notifications/*.proto