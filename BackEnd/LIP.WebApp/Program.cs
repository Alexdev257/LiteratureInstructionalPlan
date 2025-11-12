using LIP.Infrastructure.AddDependencyInjection;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Turn off log Database
builder.Logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.None);

builder.Services.AddControllers();

//session
builder.Services.AddHttpContextAccessor();

builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddScopedInterface();
builder.Services.AddCorsExtentions();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAuthorizationRole();
builder.Services.AddMediatRInfrastructure(builder.Configuration);
builder.Services.AddSesstionExtensions();
builder.Services.AddRedisConfiguration(builder.Configuration);
builder.Services.AddCloundinary(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Literature Instructional Plan API",
        Version = "v1"
    });
    // Thêm tùy chọn nhập Bearer Token vào Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Enter JWT Token here: Bearer {token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var conn = db.Database.GetConnectionString();
    Console.WriteLine($"🔌 Connection string: {conn}");

    var pending = db.Database.GetPendingMigrations().ToList();
    Console.WriteLine($"📦 Pending migrations: {pending.Count}");

    if (pending.Any())
    {
        Console.WriteLine("🚀 Running database migrations...");
        db.Database.Migrate();
        Console.WriteLine("✅ Migration completed.");
    }
    else
    {
        Console.WriteLine("✅ No pending migrations.");
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
//read file in wwwroot
app.UseStaticFiles();

// app.UseHttpsRedirection();

app.UseAuthorization();
//session
app.UseSession();

app.MapControllers();

app.Run();