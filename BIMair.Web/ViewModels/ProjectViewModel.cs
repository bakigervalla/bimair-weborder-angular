// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

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
        public string Name { get; set; }
        public string Description { get; set; }
        public string Number { get; set; }
        public string Refrence { get; set; }
        public string DeliveryAddress { get; set; }


        public DateTime DeliveryDate { get; set; }
        public string RectangularDuctwork { get; set; }
        public string RoundDuctwork { get; set; }
        public string TotalList { get; set; }

        public ICollection<OrderViewModel> Orders { get; set; }
        public CustomerViewModel Customer { get; set; }

        public string CustomerName { get => Customer?.Name; }
    }




    public class ProjectViewModelValidator : AbstractValidator<ProjectViewModel>
    {
        public ProjectViewModelValidator()
        {
            RuleFor(register => register.Name).NotEmpty().WithMessage("Project name cannot be empty");
        }
    }
}
