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
        private readonly IEmailSender _emailSender;


        public ProjectsController(
            IAccountManager accountManager,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ILogger<ProjectsController> logger,
            IEmailSender emailSender)
        {
            _accountManager = accountManager;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }



        // GET: api/values
        //[HttpGet("{pageNumber:int}/{pageSize:int}")]
        [HttpGet]
        // [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
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
        [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
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
        [ProducesResponseType(201, Type = typeof(ProjectViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]

        public IActionResult SaveProject([FromBody] ProjectViewModel model)
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
                if (!IsMyProject(project.Id))
                    return BadRequest();

                _unitOfWork.Projects.Update(project);
            }

            _unitOfWork.SaveChanges();

            return Ok();
        }

        /// <summary>
        /// Get OrderItems by projectId
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet("projectitems/{id}")]
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
                Expression<Func<OrderItem, bool>> expr = p => p.UserId == userId && p.Project.Id == id;
                items = _unitOfWork.OrderItems.Find(expr);
            }

            return Ok(_mapper.Map<IEnumerable<OrderItemViewModel>>(items));
        }

        /// <summary>
        /// Save Order Items
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpPost("saveorder")]
        [ProducesResponseType(201, Type = typeof(List<OrderItemViewModel>))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public IActionResult SaveOrderItems([FromBody] List<OrderItemViewModel> orderItems)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            string userId = this.User.GetUserId();
            orderItems.ForEach(x => x.UserId = userId);


            var items = _mapper.Map<IList<OrderItem>>(orderItems);

            var newItems = items.Where(x => x.Id == 0);
            var editedItems = items.Where(x => x.Id == 0);

            _unitOfWork.OrderItems.AddRange(newItems);
            _unitOfWork.OrderItems.UpdateRange(editedItems);

            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int Id)
        {
            if (!IsMyProject(Id))
                return BadRequest();

            Expression<Func<Project, bool>> expr = p => p.Id == Id;
            var project = _unitOfWork.Projects.GetSingleOrDefault(expr);

            if (project == null)
                return BadRequest();

            _unitOfWork.Projects.Remove(project);
            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpGet("customer/{id}")]
        [ProducesResponseType(200, Type = typeof(ProjectViewModel))]
        public IActionResult GetByCustomer(int customerId)
        {
            //bool p(Project a) => a.Customer.Id == customerId;

            Expression<Func<Project, bool>> expr = p => p.Customer.Id == customerId;

            var result = _unitOfWork.Projects.Find(expr);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(result));
        }


        [HttpGet("user/{id}")]
        [ProducesResponseType(200, Type = typeof(ProjectViewModel))]
        public IActionResult GetByUser(string userId)
        {
            Expression<Func<Project, bool>> expr = p => p.UserId == userId;

            var result = _unitOfWork.Projects.Find(expr);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(result));
        }

        private bool IsMyProject(int projectId)
        {
            string userId = this.User.GetUserId();

            if (this.User.IsUserInRole("administrator"))
                return true;
            else
            {
                Expression<Func<Project, bool>> expr = p => p.Id == projectId && p.UserId == userId;
                return _unitOfWork.Projects.GetSingleOrDefault(expr) != null;
            }

        }
    }
}
