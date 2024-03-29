﻿// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Project : AuditableEntity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Number { get; set; }
        public string Reference { get; set; }
        public string DeliveryAddress { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string RectangularDuctwork { get; set; }
        public string RoundDuctwork { get; set; }
        public string TotalList { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public Customer Customer { get; set; }
        public IEnumerable<OrderItem> OrderItems { get; set; }

        public int Status { get; set; }
    }
}
