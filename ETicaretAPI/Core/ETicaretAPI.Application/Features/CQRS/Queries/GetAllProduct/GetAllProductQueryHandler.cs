using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Application.RequestParameters;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Queries.GetAllProduct
{
    public class GetAllProductQueryHandler : IRequestHandler<GetAllProductQueryRequest, GetAllProductQueryResponse>
    {
        readonly IProductReadRepositories _productReadRepositories;
        readonly IProductWriteRepositories _productWriteRepositories;

        public GetAllProductQueryHandler(IProductReadRepositories productReadRepositories, IProductWriteRepositories productWriteRepositories)
        {
            _productReadRepositories = productReadRepositories;
            _productWriteRepositories = productWriteRepositories;
        }

        public async Task<GetAllProductQueryResponse> Handle(GetAllProductQueryRequest request, CancellationToken cancellationToken)
        {
            var totalCount = _productReadRepositories.GetAll(false).Count();
            var products = _productReadRepositories.GetAll(false).Skip(request.Size * request.Page).Take(request.Size).Select(p => new
            {
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.CreatedTime,
                p.UpdateTime
            }).ToList(); ;


            return new()
            {
                Products = products,
                TotalCount = totalCount
            };

        }
    }
}
