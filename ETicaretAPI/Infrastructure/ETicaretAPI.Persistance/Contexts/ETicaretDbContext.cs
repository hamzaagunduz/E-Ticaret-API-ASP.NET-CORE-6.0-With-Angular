using ETicaretAPI.Domain.Entites;
using ETicaretAPI.Domain.Entites.Common;
using ETicaretAPI.Domain.Entites.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistance.Contexts
{
    public class ETicaretDbContext : IdentityDbContext<AppUser,AppRole,string>
    {
        public ETicaretDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Domain.Entites.File> Files { get; set; }
        public DbSet<InvoceFile> InvoiceFiles { get; set; }
        public DbSet<ProductImageFile> ProductImageFiles { get; set; }

        public override async Task<int> SaveChangesAsync( CancellationToken cancellationToken = default)
        {
            var datas= ChangeTracker.Entries<BaseEntity>();
            foreach(var data in datas)
            {
              _=  data.State switch
                {
                    EntityState.Added => data.Entity.CreatedTime=DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdateTime=DateTime.UtcNow,
                    _=>DateTime.UtcNow,
                };
            }
            return await base.SaveChangesAsync( cancellationToken);
        }

    }
}
