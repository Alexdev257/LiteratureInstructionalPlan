using System.Reflection;
using System.Text;
using LIP.Application.CQRS.Pipeline;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using LIP.Infrastructure.Implements.Helpers;
using LIP.Infrastructure.Persistency;
using LIP.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;

namespace LIP.Infrastructure.AddDependencyInjection;

public static class ManageDependecyInjection
{
    public static void AddDatabase(this IServiceCollection service, IConfiguration config)
    {
        service.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySql(config.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection")));
        });
    }

    public static void AddScopedInterface(this IServiceCollection service)
    {
        service.AddScoped<IUserRepository, UserRepository>();
        service.AddScoped<IExamRepository, ExamRepository>();
        service.AddScoped<IRoleRepository, RoleRepository>();
        service.AddScoped<IPracticequestionRepository, PracticequestionRepository>();
        service.AddScoped<ITemplateRepository, TemplateRepository>();
        service.AddScoped<IGradelevelRepository, GradelevelRepository>();
        service.AddScoped<IExamtypeRepository, ExamtypeRepository>();
        service.AddScoped<IExamattemptRepository, ExamattemptRepository>();
        service.AddScoped<IExamanswerRepository, ExamanswerRepository>();
        service.AddScoped<IBcryptHelper, BCryptHelper>();
        service.AddScoped<IJwtHelper, JwtHelper>();
        service.AddScoped<IEmailHelper, EmailHelper>();
        service.AddScoped<ISessionExtensions, SessionExtensions>();
        service.AddScoped<IOtpHelper, OtpHelper>();
        service.AddScoped<IGoogleOAuthHelper, GoogleOAuthHelper>();
        service.AddScoped<IRedisHelper, RedisHelper>();
        service.AddScoped<IPaymentRepository, PaymentRepository>();
        service.AddScoped<ITemplatebookingRepository, TemplatebookingRepository>();
        service.AddScoped<IExamMatrixRepository, ExamMatrixRepository>();
        service.AddScoped<IExamMatrixDetailRepository, ExamMatrixDetailRepository>();
    }

    public static void AddMediatRInfrastructure(this IServiceCollection service, IConfiguration config)
    {
        var applicationAssembly = Assembly.Load("LIP.Application");

        service.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(applicationAssembly);
            cfg.AddOpenBehavior(typeof(LoggingBehavior<,>));
            cfg.AddOpenBehavior(typeof(CustomValidationBehavior<,>));

            //cfg.LicenseKey = config["LicenseKey"];
        });
    }

    public static void AddSesstionExtensions(this IServiceCollection service)
    {
        service.AddDistributedMemoryCache();
        service.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromHours(1);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });
    }

    public static void AddRedisConfiguration(this IServiceCollection service, IConfiguration configuration)
    {
        //var redisConnection = configuration.GetConnectionString("Redis");
        //var options = ConfigurationOptions.Parse(redisConnection);
        //options.Ssl = false;
        //options.AbortOnConnectFail = false;
        //options.SslProtocols = System.Security.Authentication.SslProtocols.Tls12;

        //service.AddSingleton<IConnectionMultiplexer>(sp =>
        //    ConnectionMultiplexer.Connect(options));

        var redisConnection = configuration.GetConnectionString("UptashRedis");
        service.AddSingleton<IConnectionMultiplexer>(sp =>
            ConnectionMultiplexer.Connect(redisConnection));
    }

    public static void AddCorsExtentions(this IServiceCollection service)
    {
        service.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policy => policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
    }

    public static void AddJwtAuthentication(this IServiceCollection service, IConfiguration configuration)
    {
        var jwtSettings = configuration.GetSection("JwtSettings");
        var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]!);

        service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true, // Bắt buộc kiểm tra hạn sử dụng của token
                    ClockSkew = TimeSpan.Zero, // Không cho phép trễ hạn (default là 5 phút)
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                            context.Response.Headers.Add("Token-Expired", "true");
                        return Task.CompletedTask;
                    }
                };
            });
    }

    public static void AddAuthorizationRole(this IServiceCollection service)
    {
        //1 admin
        //2 teacher
        //3 sttudent
        service.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", policy => { policy.RequireClaim("RoleId", "1".ToLower()); });

            options.AddPolicy("TeacherOnly", policy => { policy.RequireClaim("RoleId", "2".ToLower()); });

            options.AddPolicy("StudentOnly", policy => { policy.RequireClaim("RoleId", "3".ToLower()); });

            options.AddPolicy("AdminOrTeacher", policy =>
                policy.RequireAssertion(context =>
                {
                    var roleClaim = context.User.FindFirst(c => c.Type == "RoleId")?.Value;
                    //return roleClaim != "User";
                    return roleClaim == "1".ToLower() || roleClaim == "2".ToLower();
                }));

            options.AddPolicy("AdminOrStudent", policy =>
                policy.RequireAssertion(context =>
                {
                    var roleClaim = context.User.FindFirst(c => c.Type == "RoleId")?.Value;
                    //return roleClaim != "User";
                    return roleClaim == "1".ToLower() || roleClaim == "3".ToLower();
                }));

            options.AddPolicy("TeacherOrStudent", policy =>
                policy.RequireAssertion(context =>
                {
                    var roleClaim = context.User.FindFirst(c => c.Type == "RoleId")?.Value;
                    //return roleClaim != "User";
                    return roleClaim == "2".ToLower() || roleClaim == "3".ToLower();
                }));

            options.AddPolicy("AllRole", policy =>
                policy.RequireAssertion(context =>
                {
                    var roleClaim = context.User.FindFirst(c => c.Type == "RoleId")?.Value;
                    //return roleClaim != "Admin";
                    return roleClaim == "1".ToLower() || roleClaim == "2".ToLower() || roleClaim == "3".ToLower();
                }));
        });
    }

    public static void AddCloundinary(this IServiceCollection service, IConfiguration configuration)
    {
        service.Configure<AccountCloundinary>(
            configuration.GetSection("Cloudinary"));
        service.Configure<MomoService.MomoConfig>(
            configuration.GetSection("MomoAPI"));
        service.AddSingleton<ICloudinaryUpload, CloudinaryUpload>();
        service.AddSingleton<IMomoService, MomoService>();
    }
}