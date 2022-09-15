#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
# https://andrewlock.net/pushing-nuget-packages-built-in-docker-by-running-the-container/
FROM mcr.microsoft.com/dotnet/sdk:6.0.401-alpine3.16 AS build
ARG VERSION
ARG PAT
#ARG NUGET_URL
ARG WORKSPACE="./src/csharp"
# https://github.com/dotnet/dotnet-docker/blob/main/documentation/scenarios/nuget-credentials.md#using-the-azure-artifact-credential-provider
#RUN curl -L https://raw.githubusercontent.com/Microsoft/artifacts-credprovider/master/helpers/installcredprovider.sh  | sh
#ENV VSS_NUGET_EXTERNAL_FEED_ENDPOINTS {\"endpointCredentials\": [{\"endpoint\":\"${NUGET_URL}\", \"username\":\"ArtifactsDocker\", \"password\":\"${PAT}\"}]}
WORKDIR /build
COPY ${WORKSPACE}/*.sln ./
COPY ${WORKSPACE}/nuget.config .
COPY ./protos .
# Copy the main source project files
COPY ${WORKSPACE}/src/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p src/${file%.*}/ && mv $file src/${file%.*}/; done
# Copy the test project files
COPY ${WORKSPACE}/test/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p test/${file%.*}/ && mv $file test/${file%.*}/; done
RUN dotnet nuget update source github --username ArtifactsDocker --password $PAT --store-password-in-clear-text
RUN dotnet restore
COPY . .
RUN dotnet build  -c Release --no-restore  
RUN dotnet pack -p:Version=$VERSION -c Release --no-restore --no-build -o ./artifacts
#RUN dotnet nuget push /sln/artifacts/*.nupkg --source NUGET_URL --api-key $NUGET_KEY

FROM mcr.microsoft.com/dotnet/sdk:6.0.401-alpine3.16 AS final
WORKDIR /artifacts
COPY --from=build /build/artifacts/ .
ENTRYPOINT ["dotnet", "nuget", "push", "/artifacts/*.nupkg"]
CMD ["--source", $NUGET_URL]