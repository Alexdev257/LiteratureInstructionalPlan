using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Infrastructure.AddDependencyInjection
{
    public static class ManageDDependecyInjection
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
