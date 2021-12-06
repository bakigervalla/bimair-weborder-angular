// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IOrderItemRepository : IRepository<OrderItem>
    {
        IEnumerable<OrderItem> GetOrderItemsByProject(int projectId);
        IEnumerable<OrderItem> GetOrderItemsByUser(string userId);
        //IEnumerable<OrderItem> GetOrderItemsByCustomer(int customerId);
    }
}
