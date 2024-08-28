using ETicaretAPI.Application.Abstractions;
using ETicaretAPI.Persistance.Concretes;
using ETicaretAPI.Persistance.Contexts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Persistance.Repositories;
using ETicaretAPI.Persistance.Repositories.File;
using ETicaretAPI.Persistance.Repositories.InvoiceFile;
using ETicaretAPI.Persistance.Repositories.ProductImageFile;
using ETicaretAPI.Domain.Entites.Identity;

namespace ETicaretAPI.Persistance
{
    public static class ServiceRegistration
    {
        public static void AddPersistanceServices(this IServiceCollection services)
        {

            services.AddDbContext<ETicaretDbContext>(options => options.UseNpgsql(Configuration.ConnectionString));

            services.AddIdentity<AppUser, AppRole>().AddEntityFrameworkStores<ETicaretDbContext>();
            services.AddSingleton<IProductService, ProductService>();
            services.AddScoped<ICustomerReadRepositories, CustomerReadRepositories>();
            services.AddScoped<ICustomerWriteRepositories, CustomerWriteRepositories>();      
            
            services.AddScoped<IOrderReadRepositories, OrderReadRepositories>();
            services.AddScoped<IOrderWriteRepositories, OrderWriteRepositories>();  
            
            services.AddScoped<IProductReadRepositories, ProductReadRepositories>();
            services.AddScoped<IProductWriteRepositories, ProductWriteRepositories>();

            services.AddScoped<IFileReadRepositories, FileReadRepository>();
            services.AddScoped<IFileWriteRepositories, FileWriteRepository>();

            services.AddScoped<IProductImageFileReadRepository, ProductImageFileReadRepository>();
            services.AddScoped<IProductImageFileWriteRepository, ProductImageFileWriteRepository>();

            services.AddScoped<IInvoiceFileReadRepository, InvoiceFileReadRepository>();
            services.AddScoped<IInvoiceFileWriteRepository, InvoiceFileWriteRepository>();

        }
    }
}
