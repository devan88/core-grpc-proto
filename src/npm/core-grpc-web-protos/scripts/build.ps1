cd ../../../protos;
$protoc_gen_ts = Join-Path -Path "$((Get-Item .).FullName)" -ChildPath "..\src\npm\core-grpc-web-protos\node_modules\.bin\protoc-gen-ts.cmd";
$protoc_gen_grpc = Join-Path -Path "$((Get-Item .).FullName)" -ChildPath "..\src\npm\core-grpc-web-protos\node_modules\.bin\grpc_tools_node_protoc_plugin.cmd";
$output_dir = "../src/npm/core-grpc-web-protos/protos";
Remove-Item "$output_dir\*" -Recurse -Force;
# grpc-js
# JavaScript code generating
# grpc_tools_node_protoc.cmd `
#     --plugin=protoc-gen-grpc=$protoc_gen_grpc `
#     --js_out="import_style=commonjs,binary:$output_dir" `
#     --grpc_out=grpc_js:$output_dir `
#     ./notifications/*.proto

# grpc_tools_node_protoc.cmd `
#     --plugin=protoc-gen-ts=$protoc_gen_ts `
#     --ts_out=grpc_js:$output_dir `
#     ./notifications/*.proto

grpc_tools_node_protoc.cmd `
    --plugin=protoc-gen-ts=$protoc_gen_ts `
    --js_out="import_style=commonjs,binary:$output_dir" `
    --ts_out="service=grpc-web:$output_dir" `
    ./notifications/*.proto
#grpc_tools_node_protoc.cmd --js_out=import_style=commonjs,binary:./gen --grpc_out=grpc_js:./gen notification.proto