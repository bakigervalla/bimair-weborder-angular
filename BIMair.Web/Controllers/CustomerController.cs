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
using System.Net;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;

namespace BIMair.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;


        public CustomerController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }


        // GET: api/values
        [HttpGet("list")]
        public IActionResult Get()
        {
            string userId = this.User.GetUserId();

            if (!this.User.IsUserInRole("administrator"))
                return BadRequest();

            var allCustomers = _unitOfWork.Customers.GetAllCustomersData().OrderByDescending(x=> x.Id);
            return Ok(_mapper.Map<IEnumerable<CustomerViewModel>>(allCustomers));
        }

        [HttpGet("byuser")]
        public IActionResult GetCustomersByUser()
        {
            string userId = this.User.GetUserId();
            Expression<Func<Customer, bool>> expr = p => p.UserId == userId;

            // var allCustomers = _unitOfWork.Customers.GetAllCustomersData();
            var customers = _unitOfWork.Customers.Find(expr);
            return Ok(_mapper.Map<IEnumerable<CustomerViewModel>>(customers));
        }

        [HttpGet("throw")]
        public IEnumerable<CustomerViewModel> Throw()
        {
            throw new InvalidOperationException("This is a test exception: " + DateTime.Now);
        }



        [HttpGet("email")]
        public async Task<string> Email()
        {
            string recepientName = "BIMair Tester"; //         <===== Put the recepient's name here
            string recepientEmail = "test@bimair.nl"; //   <===== Put the recepient's email here

            string message = EmailTemplates.GetTestEmail(recepientName, DateTime.UtcNow);

            (bool success, string errorMsg) = await _emailSender.SendEmailAsync(recepientName, recepientEmail, "Test Email from BIMair", message);

            if (success)
                return "Success";

            return "Error: " + errorMsg;
        }



        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value: " + id;
        }



        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }



        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
