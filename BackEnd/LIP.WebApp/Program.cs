using LIP.Infrastructure.AddDependencyInjection;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Turn off log Database
builder.Logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.None);

builder.Services.AddControllers();

//session
builder.Services.AddHttpContextAccessor();

builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddScopedInterface();
builder.Services.AddMediatRInfrastructure(builder.Configuration);
builder.Services.AddSesstionExtensions();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//read file in wwwroot
app.UseStaticFiles();

// app.UseHttpsRedirection();

app.UseAuthorization();

//session
app.UseSession();

app.MapControllers();

app.Run();
