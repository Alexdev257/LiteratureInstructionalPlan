using LIP.Infrastructure.Persistency;
using LIP.Application.Interface.Repository;
using LIP.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using LIP.Application.CQRS.Pipeline;
using LIP.Application.Interface.Helpers;
using LIP.Infrastructure.Implements.Helpers;
namespace LIP.Infrastructure.AddDependencyInjection
{
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
            service.AddScoped<ISubmissionRepository, SubmissionRepository>();
            service.AddScoped<IRoleRepository, RoleRepository>();
            service.AddScoped<IPracticequestionRepository, PracticequestionRepository>();
            service.AddScoped<ITemplateRepository, TemplateRepository>();
            service.AddScoped<IGradelevelRepository, GradelevelRepository>();
            service.AddScoped<IBookseriesRepository, BookseriesRepository>();
            service.AddScoped<IExamtypeRepository, ExamtypeRepository>();
            service.AddScoped<IExamattemptRepository, ExamattemptRepository>();
            service.AddScoped<IExamanswerRepository, ExamanswerRepository>();
            service.AddScoped<IAnswerguideRepository, AnswerguideRepository>();
            service.AddScoped<IBcryptHelper, BCryptHelper>();
            service.AddScoped<IJwtHelper, JwtHelper>();
            service.AddScoped<IEmailHelper, EmailHelper>();
            service.AddScoped<ISessionExtensions, SessionExtensions>();
            service.AddScoped<IOtpHelper, OtpHelper>();
            service.AddScoped<IGoogleOAuthHelper, GoogleOAuthHelper>();
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
    }
}
