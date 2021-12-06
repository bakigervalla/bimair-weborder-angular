// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using Newtonsoft.Json;
using System;
using System.Linq;


namespace BIMair.ViewModels
{
    public class OrderItemViewModel
    {
        public string Id { get; set; }
        public string Position { get; set; }
        public string Code { get; set; }
        public string Number { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string E { get; set; }
        public string F { get; set; }
        public string G1 { get; set; }
        public string G2 { get; set; }
        public string H1 { get; set; }
        
        public string H2 { get; set; }
        public string I1 { get; set; }
        public string I2 { get; set; }
        public string K1 { get; set; }
        public string K2 { get; set; }
        public string L1 { get; set; }
        public string L2 { get; set; }
        public string L3 { get; set; }
        public string L4 { get; set; }
        public string Connection1 { get; set; }
        public string Connection2 { get; set; }
        public string Connection3 { get; set; }
        public string Note { get; set; }
        public string Diameter1 { get; set; }
        public string Diameter2 { get; set; }
        public string Length { get; set; }

        //public string ProjectId { get; set; }
        public string ProductType { get; set; }
        public string UserId { get; set; }
        //*public DateTime DateCreated { get; set; }
        public Project Project { get; set; }
    }
}
