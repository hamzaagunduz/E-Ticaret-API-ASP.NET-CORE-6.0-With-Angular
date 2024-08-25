using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Persistance.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Repositories
{
    public class FileReadRepository : ReadRepository<ETicaretAPI.Domain.Entites.File>, IFileReadRepositories
    {
        public FileReadRepository(ETicaretDbContext context) : base(context)
        {
        }
    }
}
