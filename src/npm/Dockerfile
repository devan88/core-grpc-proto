FROM node:18.8-buster-slim AS base
ARG PROTOS_PATH="./protos"
ARG WORKSPACE="./src/npm"
WORKDIR /build
RUN mkdir -p ./bin
COPY ${PROTOS_PATH} /protos
COPY ${WORKSPACE} .

FROM base AS build
ARG VERSION="0.0.1"
RUN for dir in core-grpc-*/ ; do \
    [ -L "${dir%/}" ] && continue; \
    cd /build/$dir; \
    npm ci; \
    npm version ${VERSION}; \
    npm run build-protos-sh; \
    npm run build; \
    npm pack --pack-destination /build/bin; \
    done

FROM node:18.8-buster-slim AS final
ARG WORKSPACE="./src/npm"
WORKDIR /packages
COPY ${WORKSPACE}/.npmrc .
COPY --from=build /build/bin/ .
ENTRYPOINT [ "/bin/bash", "-c", "for tgz in *.tgz ; do npm publish ${tgz}; done" ]