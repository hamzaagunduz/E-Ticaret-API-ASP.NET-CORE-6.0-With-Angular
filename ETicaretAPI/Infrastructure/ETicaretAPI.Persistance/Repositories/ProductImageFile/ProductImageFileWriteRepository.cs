using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Persistance.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Repositories
{
    public class ProductImageFileWriteRepository : WriteRepository<ETicaretAPI.Domain.Entites.ProductImageFile>, IProductImageFileWriteRepository
    {
        public ProductImageFileWriteRepository(ETicaretDbContext context) : base(context)
        {
        }
    }
}
