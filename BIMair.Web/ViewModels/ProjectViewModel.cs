// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BIMair.ViewModels
{
    public class ProjectViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get => Name; }
        public string CustomerName { get; set; }
        public string Number { get; set; }
        public string Reference { get; set; }
        public string DeliveryAddress { get; set; }
        public DateTime DeliveryDate { get; set; }

        //public string RectangularDuctwork { get; set; }
        //public string RoundDuctwork { get; set; }
        //public string TotalList { get; set; }

        //public ICollection<OrderViewModel> Orders { get; set; }
        // public Customer Customer { get; set; }

        public int? CustomerId { get; set; }
    }




    public class ProjectViewModelValidator : AbstractValidator<ProjectViewModel>
    {
        public ProjectViewModelValidator()
        {
            RuleFor(register => register.Name).NotEmpty().WithMessage("Project name cannot be empty");
        }
    }
}
