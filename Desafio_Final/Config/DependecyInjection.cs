using Desafio_Final.Interfaces;
using Desafio_Final.Services;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Desafio_Final.Config
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddDIConfiguration(this IServiceCollection services)
        {            
            services.AddScoped<IUsuarioServices, UsuarioServices>();
            services.AddScoped<IEstoqueService, EstoqueService>();
            services.AddScoped<ILogEntradaSaidaService, LogEntradaSaidaService>();
            return services;
        }
    }
}
