﻿// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Core;
using DAL.Core.Interfaces;

namespace DAL
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountManager _accountManager;
        private readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
        {
            _accountManager = accountManager;
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);

            ApplicationUser adminUser = null,
                defaultUser = null;

            if (!await _context.Users.AnyAsync())
            {
                _logger.LogInformation("Generating inbuilt accounts");

                const string adminRoleName = "administrator";
                const string userRoleName = "user";

                await EnsureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                await EnsureRoleAsync(userRoleName, "Default user", ApplicationPermissions.GetDefaultPermissionValues()); // new string[] { });

                adminUser = await CreateUserAsync("info@bimair.nl", "admiN@123", "Inbuilt Administrator", "admin@bimair.com", "+1 (123) 000-0000", new string[] { adminRoleName });
                defaultUser = await CreateUserAsync("janr@bimair.nl", "janR@123", "Inbuilt Standard User", "user@bimair.com", "+1 (123) 000-0001", new string[] { userRoleName });

                _logger.LogInformation("Inbuilt account generation completed");
            }



            if (!await _context.Customers.AnyAsync())
            {
                _logger.LogInformation("Seeding initial data");

                Customer cust_1 = new Customer
                {
                    Name = "BIMair Admin",
                    Email = "info@bimair.nl",
                    Country = 1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Customer cust_2 = new Customer
                {
                    Name = "Jan Rood",
                    Email = "janr@bimair.nl",
                    PhoneNumber = "088-0568900",
                    Address = "Assen",
                    City = "Assen",
                    Country = 1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Customer cust_3 = new Customer
                {
                    Name = "John Doe",
                    Email = "johndoe@anonymous.com",
                    PhoneNumber = "+18585858",
                    Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                    City = "Lorem Ipsum",
                    Country = 2,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Customer cust_4 = new Customer
                {
                    Name = "Jane Doe",
                    Email = "Janedoe@anonymous.com",
                    PhoneNumber = "+18585858",
                    Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                    City = "Lorem Ipsum",
                    Country = 1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Project prj_1 = new Project
                {
                    Name = "Project 1",
                    Description = "Yet another masterpiece project",
                    CustomerId = cust_3 == null ? 1 : cust_3.Id,
                    UserId = adminUser == null ? "00cf490b-58e0-4b4c-a988-e19151950d69" : adminUser?.Id,
                    Number = "123",
                    Reference = "A123",
                    DeliveryAddress = "Assen",
                    DeliveryDate = DateTime.UtcNow,
                    RectangularDuctwork = "Rectangular",
                    RoundDuctwork = "Rounded",
                    TotalList = "1",
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                };

                Project prj_2 = new Project
                {
                    Name = "Project 58",
                    Description = "Yet another fantastic project",
                    CustomerId = cust_4 == null ? 2 : cust_4.Id,
                    UserId = defaultUser == null ? "0e7388d5-e28c-4010-949d-284856a07f99" : defaultUser?.Id,
                    Number = "007",
                    Reference = "A007",
                    DeliveryAddress = "Pristina",
                    DeliveryDate = DateTime.UtcNow,
                    RectangularDuctwork = "Rectangular",
                    RoundDuctwork = "Rounded",
                    TotalList = "77",
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
            };

                _context.Customers.Add(cust_1);
                _context.Customers.Add(cust_2);
                _context.Customers.Add(cust_3);
                _context.Customers.Add(cust_4);

                _context.Projects.Add(prj_1);
                _context.Projects.Add(prj_2);

                await _context.SaveChangesAsync();

                _logger.LogInformation("Seeding initial data completed");
            }
        }



        private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
        {
            if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                ApplicationRole applicationRole = new ApplicationRole(roleName, description);

                var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

                if (!result.Succeeded)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Errors)}");
            }
        }

        private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            ApplicationUser applicationUser = new ApplicationUser
            {
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };

            var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

            if (!result.Succeeded)
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Errors)}");


            return applicationUser;
        }
    }
}
