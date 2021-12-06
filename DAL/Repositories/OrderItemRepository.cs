// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class OrderItemRepository : Repository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public IEnumerable<OrderItem> GetOrderItemsByProject(int projectId)
        {
            return _appContext.OrderItems.Where(x => x.ProjectId == projectId)
            //.Include(c => c.Project).ThenInclude(c => c.Customer)
            .OrderByDescending(c => c.DateCreated)
            .ToList();
        }

        public IEnumerable<OrderItem> GetOrderItemsByUser(string userId)
        {
            return _appContext.OrderItems.Where(x => x.UserId == userId)
                    //.Include(c => c.Project).ThenInclude(c => c.Customer)
                    .OrderByDescending(c => c.DateCreated)
                    .ToList();
        }

        //public IEnumerable<OrderItem> GetOrderItemsByCustomer(int customerId)
        //{
        //    return _appContext.OrderItems.Where(x => x.Project.CustomerId == customerId)
        //               .Include(c => c.Project).ThenInclude(c => c.Customer)
        //               .OrderByDescending(c => c.DateCreated)
        //               .ToList();
        //}

    }
}
