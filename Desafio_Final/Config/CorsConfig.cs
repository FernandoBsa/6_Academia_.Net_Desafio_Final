using Desafio_Final.Interfaces;
using Desafio_Final.Services;

namespace Desafio_Final.Config
{
    public static class CorsConfig
    {
        public static IServiceCollection AddCorsConfiguration(this IServiceCollection services)
        {

            services.AddCors(options => {
                options.AddPolicy("MyPolicy",
                    builder => builder.WithOrigins("https://localhost:4200/", "http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod());
            });

            return services;            
        }
    }
}
