using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Domain.Entites;
using ETicaretAPI.Persistance.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Repositories
{
    public class ProductWriteRepositories : WriteRepository<Product>, IProductWriteRepositories
    {
        public ProductWriteRepositories(ETicaretDbContext context) : base(context)
        {
        }
    }
}
