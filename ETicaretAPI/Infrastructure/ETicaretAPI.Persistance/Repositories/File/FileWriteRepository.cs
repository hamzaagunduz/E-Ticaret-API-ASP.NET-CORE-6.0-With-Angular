using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Persistance.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Repositories.File
{
    public class FileWriteRepository : WriteRepository<ETicaretAPI.Domain.Entites.File>, IFileWriteRepositories
    {
        public FileWriteRepository(ETicaretDbContext context) : base(context)
        {
        }
    }
}
