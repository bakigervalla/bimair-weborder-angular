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

namespace BIMair.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;


        public ProjectController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<ProjectController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }



        // GET: api/values
        [HttpGet("projects/{pageNumber:int}/{pageSize:int}")]
        [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<ProjectViewModel>))]
        public async Task<IActionResult> Get(int pageNumber, int pageSize)
        {
            var allProjects = await _unitOfWork.Projects.GetProjects(pageNumber, pageSize);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(allProjects));
        }



        [HttpGet("projects/customer/{id}")]
        [ProducesResponseType(200, Type = typeof(ProjectViewModel))]
        public IActionResult GetByCustomer(int customerId)
        {
            //bool p(Project a) => a.Customer.Id == customerId;

            Expression<Func<Project, bool>> expr = p => p.Customer.Id == customerId;

            var result = _unitOfWork.Projects.Find(expr);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(result));
        }


        [HttpGet("projects/user/{id}")]
        [ProducesResponseType(200, Type = typeof(ProjectViewModel))]
        public IActionResult GetByUser(string userId)
        {
            Expression<Func<Project, bool>> expr = p => p.UserId == userId;

            var result = _unitOfWork.Projects.Find(expr);
            return Ok(_mapper.Map<IEnumerable<ProjectViewModel>>(result));
        }


        [HttpPost("projects")]
        public IActionResult Add(ProjectViewModel model)
        {
            _unitOfWork.Projects.Add(_mapper.Map<Project>(model));
            return Ok();
        }


        [HttpPut("projects")]
        public IActionResult Update(ProjectViewModel model)
        {
            _unitOfWork.Projects.Update(_mapper.Map<Project>(model));
            return Ok();
        }

        [HttpDelete("projects/{id}")]
        public IActionResult Delete(int projectId)
        {
            Expression<Func<Project, bool>> expr = p => p.Id == projectId;
            var project = _unitOfWork.Projects.GetSingleOrDefault(expr);

            _unitOfWork.Projects.Remove(project);
            return Ok();
        }

    }
}
