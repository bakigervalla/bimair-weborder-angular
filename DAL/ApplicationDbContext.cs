// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using DAL.Models.Interfaces;

namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public string CurrentUserId { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }



        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            const string priceDecimalType = "decimal(18,2)";

            builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Customer>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().HasIndex(c => c.Name);
            builder.Entity<Customer>().Property(c => c.Email).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.PhoneNumber).IsUnicode(false).HasMaxLength(30);
            builder.Entity<Customer>().Property(c => c.City).HasMaxLength(50);
            builder.Entity<Customer>().ToTable($"App_{nameof(this.Customers)}");

            builder.Entity<OrderItem>().Property(c => c.Position).IsRequired().HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.Code).IsRequired().HasMaxLength(35);
            builder.Entity<OrderItem>().HasIndex(c => c.Code);
            builder.Entity<OrderItem>().Property(c => c.A).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.B).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.C).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.D).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.E).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.F).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.G1).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.G2).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.H1).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.H2).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.I1).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.I2).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.K1).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.K2).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.L1).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.L2).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.L3).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.L4).HasMaxLength(35);
            builder.Entity<OrderItem>().Property(c => c.Connection1).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.Connection2).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.Connection3).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.Diameter1).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.Diameter2).HasMaxLength(10);
            builder.Entity<OrderItem>().Property(c => c.ProductType).HasMaxLength(20);
            builder.Entity<OrderItem>().Property(c => c.UserId).HasMaxLength(85);
            builder.Entity<OrderItem>().ToTable($"App_{nameof(this.OrderItems)}");
            
            builder.Entity<Project>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Project>().HasIndex(c => c.Name);
            builder.Entity<Project>().Property(c => c.Description).IsRequired().HasMaxLength(450);
            builder.Entity<Project>().HasOne(p => p.Customer);
            builder.Entity<Project>().HasMany(p => p.OrderItems);
            builder.Entity<Project>().ToTable($"App_{nameof(this.Projects)}");            
        }


        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }


        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }


        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


        private void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));


            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = CurrentUserId;
            }
        }
    }
}
