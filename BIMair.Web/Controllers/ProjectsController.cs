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
                        projects.OrderByDescending(x=> x.CreatedDate))
                     );
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


        [HttpPost("projects")]
        public IActionResult Add([FromBody] ProjectViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (model.Id == 0)
                _unitOfWork.Projects.Add(_mapper.Map<Project>(model));
            else
                _unitOfWork.Projects.Add(_mapper.Map<Project>(model));
            return Ok();
        }


        [HttpPut("projects")]
        public IActionResult Update(ProjectViewModel model)
        {
            _unitOfWork.Projects.Update(_mapper.Map<Project>(model));
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int projectId)
        {
            Expression<Func<Project, bool>> expr = p => p.Id == projectId;
            var project = _unitOfWork.Projects.GetSingleOrDefault(expr);

            _unitOfWork.Projects.Remove(project);
            return Ok();
        }

    }
}
