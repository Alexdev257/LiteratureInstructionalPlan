using LIP.Infrastructure.Persistency;
using LIP.Application.Interface.Repository;
using LIP.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
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
        }

        public static void AddMediatRInfrastructure(this IServiceCollection service, IConfiguration config)
        {
            var applicationAssembly = Assembly.Load("LIP.Application");

            service.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(applicationAssembly);
                //cfg.LicenseKey = config["LicenseKey"];
            });
        }
    }
}
