// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public ProjectRepository(ApplicationDbContext context) : base(context)
        { }


        public async Task<IEnumerable<Project>> GetProjects()
        {
            IQueryable<Project> projectsQuery = _appContext.Projects
               .Include(c => c.Customer).Include(c => c.OrderItems)
               .OrderByDescending(c => c.DateCreated);

            // if (page != -1)
            //    projectsQuery = projectsQuery.Skip((page - 1) * pageSize);

            //if (pageSize != -1)
            //    projectsQuery = projectsQuery.Take(pageSize);

            //var projects = await projectsQuery.ToListAsync();

            return projectsQuery;
        }

        public IEnumerable<Project> GetProjectsByUser(string userId)
        {
            return _appContext.Projects.Where(x=> x.UserId == userId)
                        .Include(c => c.Customer).Include(c => c.OrderItems)
                        .OrderByDescending(c => c.DateCreated)
                        .ToList();
        }

        public IEnumerable<Project> GetProjectsByCustomer(int customerId)
        {
            return _appContext.Projects.Where(x => x.CustomerId == customerId)
                        .Include(c => c.Customer).Include(c => c.OrderItems)
                        .OrderByDescending(c => c.DateCreated)
                        .ToList();
        }

    }
}
