using AutoMapper;
using Mng.Core;
using Mng.Core.Repositories;
using Mng.Core.Services;
using Mng.Data.Repositories;
using Mng.Services;

namespace Mng.API.Configuration
{
    public static class Configuration
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IAuthService, AuthenticationService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IPositionRepository, PositionRepository>();
            services.AddScoped<IPositionService, Positionservice>();
        }
    }
}
