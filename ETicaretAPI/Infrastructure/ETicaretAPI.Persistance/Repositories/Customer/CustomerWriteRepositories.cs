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
    public class CustomerWriteRepositories : WriteRepository<Customer>, ICustomerWriteRepositories
    {
        public CustomerWriteRepositories(ETicaretDbContext context) : base(context)
        {
        }
    }
}
