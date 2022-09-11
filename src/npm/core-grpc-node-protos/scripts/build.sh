#!/bin/bash
cd ../../../protos;
$output_dir = "../src/npm/core-grpc-protos/protos";
# grpc-js
# JavaScript code generating
grpc_tools_node_protoc.cmd `
    --js_out=import_style=commonjs,binary:$output_dir `
    --grpc_out=grpc_js:$output_dir `
    ./notifications/*.proto

grpc_tools_node_protoc.cmd `
    --plugin=protoc-gen-ts=$protoc_gen_ts_path `
    --ts_out=grpc_js:$output_dir `
    ./notifications/*.proto
#grpc_tools_node_protoc.cmd --js_out=import_style=commonjs,binary:./gen --grpc_out=grpc_js:./gen notification.proto