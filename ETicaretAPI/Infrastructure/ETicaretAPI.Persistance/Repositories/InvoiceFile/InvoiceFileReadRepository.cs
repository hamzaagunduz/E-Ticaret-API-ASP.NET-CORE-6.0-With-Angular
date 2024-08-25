using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Persistance.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Repositories.InvoiceFile
{
    public class InvoiceFileReadRepository : ReadRepository<ETicaretAPI.Domain.Entites.InvoceFile>, IInvoiceFileReadRepository
    {
        public InvoiceFileReadRepository(ETicaretDbContext context) : base(context)
        {
        }
    }
}
