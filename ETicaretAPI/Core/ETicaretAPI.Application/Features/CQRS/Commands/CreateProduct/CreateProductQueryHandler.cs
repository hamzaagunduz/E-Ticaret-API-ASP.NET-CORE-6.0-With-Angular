using ETicaretAPI.Application.IRepositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Commands.CreateProduct
{
    public class CreateProductQueryHandler : IRequestHandler<CreateProductQueryRequest, CreateProductQueryResponse>
    {
        readonly IProductWriteRepositories _productWriteRepositories;

        public CreateProductQueryHandler(IProductWriteRepositories productWriteRepositories)
        {
            _productWriteRepositories = productWriteRepositories;
        }

        public async Task<CreateProductQueryResponse> Handle(CreateProductQueryRequest request, CancellationToken cancellationToken)
        {
            await _productWriteRepositories.AddAsync(new()
            {
                Name = request.name,
                Price = request.price,
                Stock = request.stock,

            });
            await _productWriteRepositories.SaveAsync();
            return new();
        }
    }
    
}
