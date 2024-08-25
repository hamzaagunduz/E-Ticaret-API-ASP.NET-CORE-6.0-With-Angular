using ETicaretAPI.Application.Abstractions;
using ETicaretAPI.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Concretes
{
    public class ProductService : IProductService
    {
        public List<Product> GetProducts()
                => new() 
                {
                    new()
                    {
                        Id=Guid.NewGuid(),
                        Name="b",
                        Price=11,
                        Stock=1,
                        CreatedTime=DateTime.Now,
                    },
                                        new()
                    {
                        Id=Guid.NewGuid(),
                        Name="a",
                        Price=13,
                        Stock=1,
                        CreatedTime=DateTime.Now,
                    },                    new()
                    {
                        Id=Guid.NewGuid(),
                        Name="ac",
                        Price=12,
                        Stock=1,
                        CreatedTime=DateTime.Now,
                    },                    new()
                    {
                        Id=Guid.NewGuid(),
                        Name="d1",
                        Price=1,
                        Stock=1,
                        CreatedTime=DateTime.Now,
                    }

                };
    }
}
