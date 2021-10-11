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
    public interface IProjectRepository : IRepository<Project>
    {
        Task<IEnumerable<Project>> GetProjects(int page, int pageSize);
        IEnumerable<Project> GetProjectsByUser(string userId);
        IEnumerable<Project> GetProjectsByCustomer(int customerId);
    }
}
