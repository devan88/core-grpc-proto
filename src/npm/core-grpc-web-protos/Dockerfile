FROM node:18.8-buster-slim AS base
ARG PROTOS_PATH="./protos"
ARG WORKSPACE="./src/npm/core-grpc-web-protos"
WORKDIR /build
COPY ${PROTOS_PATH} /protos
COPY ${WORKSPACE} .

FROM base AS build
RUN npm install
RUN npm run build-protos-sh
RUN npm run build
RUN mkdir -p ./bin
RUN npm run pack

FROM node:18.8-buster-slim AS final
WORKDIR /packages
COPY --from=build /build/bin/ .