# Use the .NET 8 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and project files to restore dependencies
COPY ["LiteratureInstructionalPlan.sln", "./"]
COPY ["LIP.Application/LIP.Application.csproj", "LIP.Application/"]
COPY ["LIP.Domain/LIP.Domain.csproj", "LIP.Domain/"]
COPY ["LIP.Infrastructure/LIP.Infrastructure.csproj", "LIP.Infrastructure/"]
COPY ["LIP.WebApp/LIP.WebApp.csproj", "LIP.WebApp/"]

# Restore dependencies for all projects
RUN dotnet restore "LiteratureInstructionalPlan.sln"

# Copy the rest of the source code
COPY . .

# Build and publish the WebApp project
WORKDIR "/src/LIP.WebApp"
RUN dotnet publish "LIP.WebApp.csproj" -c Release -o /app/publish --no-restore

# Use the ASP.NET 8 runtime image for the final, smaller image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose the port the app will run on
EXPOSE 80
EXPOSE 443

# Set the entry point for the container
ENTRYPOINT ["dotnet", "LIP.WebApp.dll"]
