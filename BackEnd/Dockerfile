# =========================
# 1️⃣ BUILD STAGE
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution + csproj files để restore trước
COPY ["LiteratureInstructionalPlan.sln", "./"]
COPY ["LIP.Application/LIP.Application.csproj", "LIP.Application/"]
COPY ["LIP.Domain/LIP.Domain.csproj", "LIP.Domain/"]
COPY ["LIP.Infrastructure/LIP.Infrastructure.csproj", "LIP.Infrastructure/"]
COPY ["LIP.WebApp/LIP.WebApp.csproj", "LIP.WebApp/"]

# Restore dependencies
RUN dotnet restore "LiteratureInstructionalPlan.sln"

# Copy toàn bộ source code
COPY . .

# Build và publish project WebApp
WORKDIR "/src/LIP.WebApp"
RUN dotnet publish "LIP.WebApp.csproj" -c Release -o /app/publish --no-restore

# =========================
# 2️⃣ RUNTIME STAGE
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy file từ build stage
COPY --from=build /app/publish .

# Mở cổng
EXPOSE 80
EXPOSE 443

# Chạy app
ENTRYPOINT ["dotnet", "LIP.WebApp.dll"]
