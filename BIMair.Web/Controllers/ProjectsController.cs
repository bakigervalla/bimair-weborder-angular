// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAL;
using BIMair.ViewModels;
using AutoMapper;
using Microsoft.Extensions.Logging;
using BIMair.Helpers;
using DAL.Models;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using DAL.Core.Interfaces;
using BIMair.Services;
using Sentry;
using Newtonsoft.Json;

namespace BIMair.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IAccountManager _accountManager;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailService _emailService;

        private readonly IHub _sentryHub;

        public ProjectsController(
            IAccountManager accountManager,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ILogger<ProjectsController> logger,
            IEmailService emailService,
            IHub sentryHub)
        {
            _accountManager = accountManager;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailService = emailService;

            _sentryHub = sentryHub;
        }



        // GET: api/values
        //[HttpGet("{pageNumber:int}/{pageSize:int}")]
        [HttpGet]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(200, Type = typeof(List<ProjectViewModel>))]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Project> projects;

            string userId = this.User.GetUserId();

            if (this.User.IsUserInRole("administrator"))
                projects = await _unitOfWork.Projects.GetProjects();
            else
            {
                Expression<Func<Project, bool>> expr = p => p.UserId == userId;
                projects = _unitOfWork.Projects.Find(expr);
            }

            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(
                        projects.OrderByDescending(x => x.CreatedDate))
                     );
        }

        [HttpGet("{id}")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(200, Type = typeof(List<ProjectViewModel>))]
        public async Task<IActionResult> GetProjectById(int id)
        {
            Project project;

            string userId = this.User.GetUserId();

            if (this.User.IsUserInRole("administrator"))
            {
                Expression<Func<Project, bool>> expr = p => p.Id == id;
                project = _unitOfWork.Projects.GetSingleOrDefault(expr);
            }
            else
            {
                Expression<Func<Project, bool>> expr = p => p.UserId == userId && p.Id == id;
                project = _unitOfWork.Projects.GetSingleOrDefault(expr);
            }

            if (project != null)
                project.Customer = _unitOfWork.Customers.GetSingleOrDefault(x => x.Id == project.CustomerId);

            return Ok(_mapper.Map<ProjectViewModel>(project));
        }


        [HttpPost("save")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(201, Type = typeof(ProjectViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public IActionResult SaveProject([FromBody] ProjectViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                string userId = this.User.GetUserId();

                model.UserId = userId;

                Expression<Func<Customer, bool>> expr = p => p.Name == model.CustomerName && p.UserId == userId;
                var customer = _unitOfWork.Customers.GetSingleOrDefault(expr);

                if (customer == null)
                {
                    customer = _unitOfWork.Customers.Add(new Customer { Name = model.CustomerName, UserId = userId });
                    _unitOfWork.SaveChanges();
                }

                var project = _mapper.Map<Project>(model);
                project.Customer = customer;

                if (model.Id == 0)
                    _unitOfWork.Projects.Add(project);
                else
                {
                    if (!IsProjectOwner(project, userId))
                        return BadRequest();

                    _unitOfWork.Projects.Update(project);
                }

                _unitOfWork.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                SentrySdk.CaptureMessage("Exception: " + ex.Message + " Inner exception: " + ex.InnerException?.Message);
                return BadRequest();
            }
        }

        /// <summary>
        /// Get OrderItems by projectId
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet("projectitems/{id}")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(201, Type = typeof(IEnumerable<OrderItemViewModel>))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public IActionResult GetProjectItemsByProjectId(int id)
        {
            if (id <= 0)
                return BadRequest();

            IEnumerable<OrderItem> items;
            string userId = this.User.GetUserId();

            if (this.User.IsUserInRole("administrator"))
            {
                items = _unitOfWork.OrderItems.GetOrderItemsByProject(id);
            }
            else
            {
                Expression<Func<OrderItem, bool>> expr = p => p.UserId == userId && p.ProjectId == id;
                items = _unitOfWork.OrderItems.Find(expr);
            }

            return Ok(_mapper.Map<IEnumerable<OrderItemViewModel>>(items));
        }

        /// <summary>
        /// Save Order Items
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpPost("saveorder/{confirmorder}")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(201, Type = typeof(List<OrderItemViewModel>))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> SaveOrderItems(int confirmorder, [FromBody] List<OrderItemViewModel> orderItems)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (orderItems == null || orderItems.Count() == 0)
                return BadRequest();

            string userId = this.User.GetUserId();
            orderItems.ForEach(x => x.UserId = userId);

            var items = _mapper.Map<IList<OrderItem>>(orderItems);

            var newItems = items.Where(x => x.Id == 0);
            var editedItems = items.Where(x => x.Id > 0);

            _unitOfWork.OrderItems.AddRange(newItems);
            _unitOfWork.OrderItems.UpdateRange(editedItems);

            _unitOfWork.SaveChanges();


            // deleted items
            IEnumerable<OrderItem> deletedItems = new List<OrderItem>();

            // get deleted items
            if (editedItems != null && editedItems.Count() > 0)
            {
                var projectId = editedItems.First().ProjectId;

                Expression<Func<OrderItem, bool>> expr = p => p.UserId == userId && p.ProjectId == projectId;
                var allUserAndProjectItems = _unitOfWork.OrderItems.Find(expr);

                var editedIds = editedItems.Select(x => x.Id);
                deletedItems = allUserAndProjectItems.Where(x => !editedIds.Contains(x.Id));

                if (deletedItems != null && deletedItems.Count() > 0)
                {
                    _unitOfWork.OrderItems.RemoveRange(deletedItems);
                    _unitOfWork.SaveChanges();
                }
            }

            // Notify by email
            int prjId = newItems != null && newItems.Count() > 0 ? newItems.First().ProjectId : editedItems.First().ProjectId;

            Expression<Func<Project, bool>> prodicate = p => p.Id == prjId;
            var project = _unitOfWork.Projects.GetSingleOrDefault(prodicate);

            if (confirmorder == 1) // Order confirmed
            {
                project.Status = 3; // Confirm order
                _unitOfWork.Projects.Update(project);
            }

            // send email to admin to notify for new user created
            var adminEmailed = await _emailService.SendEmailAsync(null, "NewEditOrderAdminEmailTemplate",
                new Dictionary<string, string>
                    {
                        { "projectName", project?.Name },
                        { "description", project?.Description },
                        { "deliveryDate", project?.DeliveryDate.ToShortDateString() },
                        { "client", this.User.Identity.Name }
                    });


            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        public IActionResult Delete([FromRoute] int Id)
        {
            Expression<Func<Project, bool>> expr = p => p.Id == Id;
            var project = _unitOfWork.Projects.GetSingleOrDefault(expr);

            if (project == null)
                return BadRequest();

            string userId = this.User.GetUserId();

            if (!IsProjectOwner(project, userId))
                return BadRequest();

            _unitOfWork.Projects.Remove(project);
            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpGet("customer/{id}")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(200, Type = typeof(ProjectViewModel))]
        public IActionResult GetByCustomer(int customerId)
        {
            //bool p(Project a) => a.Customer.Id == customerId;

            Expression<Func<Project, bool>> expr = p => p.Customer.Id == customerId;

            var result = _unitOfWork.Projects.Find(expr);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(result));
        }


        [HttpGet("user/{id}")]
        [Authorize(Authorization.Policies.ManageProjectsPolicy)]
        [ProducesResponseType(200, Type = typeof(ProjectViewModel))]
        public IActionResult GetByUser(string userId)
        {
            Expression<Func<Project, bool>> expr = p => p.UserId == userId;

            var result = _unitOfWork.Projects.Find(expr);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(result));
        }

        private bool IsProjectOwner(Project project, string userId)
        {
            if (this.User.IsUserInRole("administrator"))
                return true;
            else
                return project.UserId == userId;
        }
    }
}
