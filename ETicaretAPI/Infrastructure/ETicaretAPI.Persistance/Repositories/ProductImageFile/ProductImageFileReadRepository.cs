using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Persistance.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Repositories.ProductImageFile
{
    public class ProductImageFileReadRepository : ReadRepository<ETicaretAPI.Domain.Entites.ProductImageFile>, IProductImageFileReadRepository
    {
        public ProductImageFileReadRepository(ETicaretDbContext context) : base(context)
        {
        }
    }
}
