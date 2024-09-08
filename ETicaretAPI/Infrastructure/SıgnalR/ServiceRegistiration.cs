using ETicaretAPI.Application.Abstractions.Hubs;
using Microsoft.Extensions.DependencyInjection;
using SıgnalR.HubServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SıgnalR
{
    public static class ServiceRegistiration
    {
        public static void AddSignalRServices(this IServiceCollection collection)
        {
            collection.AddTransient<IProductHubService, ProductHubService>();
            collection.AddSignalR();
        }
    }
}
