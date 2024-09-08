using ETicaretAPI.Application.Abstractions.Hubs;
using Microsoft.AspNetCore.SignalR;
using SıgnalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SıgnalR.HubServices
{
    public class ProductHubService : IProductHubService
    {
        readonly IHubContext<ProductHub> _hubContext;

        public ProductHubService(IHubContext<ProductHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task ProductAddedMessages(string message)
        {
            await _hubContext.Clients.All.SendAsync("receiveProductAddedMessage",message);
        }
    }
}
