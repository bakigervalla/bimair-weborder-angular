// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using DAL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;


namespace BIMair.ViewModels
{
    public class OrderRequest
    {
        public IEnumerable<OrderItemViewModel> OrderItems { get; set; }
    }

    //public class RectangularItemViewModel
    //{
    //    [JsonProperty("id")]
    //    public int? Id { get; set; }
    //    [JsonProperty("position")]
    //    public int? Position { get; set; }
    //    [JsonProperty("code")]
    //    public string Code { get; set; }
    //    [JsonProperty("number")]
    //    public int? Number { get; set; }
    //    [JsonProperty("a")]
    //    public string A { get; set; }
    //    [JsonProperty("b")]
    //    public string B { get; set; }
    //    [JsonProperty("c")]
    //    public string C { get; set; }
    //    [JsonProperty("d")]
    //    public string D { get; set; }
    //    [JsonProperty("e")]
    //    public string E { get; set; }
    //    [JsonProperty("f")]
    //    public string F { get; set; }
    //    [JsonProperty("g1")]
    //    public string G1 { get; set; }
    //    [JsonProperty("g2")]
    //    public string G2 { get; set; }
    //    [JsonProperty("h1")]
    //    public string H1 { get; set; }
    //    [JsonProperty("h2")]
    //    public string H2 { get; set; }
    //    [JsonProperty("i1")]
    //    public string I1 { get; set; }
    //    [JsonProperty("i2")]
    //    public string I2 { get; set; }
    //    [JsonProperty("k1")]
    //    public string K1 { get; set; }
    //    [JsonProperty("k2")]
    //    public string K2 { get; set; }
    //    [JsonProperty("l1")]
    //    public int? L1 { get; set; }
    //    [JsonProperty("l2")]
    //    public int? L2 { get; set; }
    //    [JsonProperty("l3")]
    //    public int? L3 { get; set; }
    //    [JsonProperty("l4")]
    //    public string L4 { get; set; }
    //    [JsonProperty("connection1")]
    //    public string Connection1 { get; set; }
    //    [JsonProperty("connection2")]
    //    public string Connection2 { get; set; }
    //    [JsonProperty("connection3")]
    //    public string Connection3 { get; set; }
    //    [JsonProperty("notge")]
    //    public string Note { get; set; }
    //    [JsonProperty("producttype")]
    //    public string ProductType { get; set; }
    //    [JsonProperty("userid")]
    //    public string UserId { get; set; }
    //    //public DateTime? DateCreated { get; set; }

    //    public Project Project { get; set; }
    //}

    //public class RoundItemViewModel
    //{
    //    public int Id { get; set; }
    //    public string Code { get; set; }
    //    public int Number { get; set; }
    //    public string Diameter1 { get; set; }
    //    public string Diameter2 { get; set; }
    //    public string ProductType { get; set; }
    //    public string UserId { get; set; }
    //    public DateTime? DateCreated { get; set; }

    //    public Project Project { get; set; }
    //}

    //public class MontagerailItemViewModel
    //{
    //    public int Id { get; set; }
    //    public string Code { get; set; }
    //    public int Number { get; set; }
    //    public int Length { get; set; }
    //    public string ProductType { get; set; }
    //    public string UserId { get; set; }
    //    public DateTime? DateCreated { get; set; }

    //    public Project Project { get; set; }
    //}

    //public class TotaalbladItemViewModel
    //{
    //    public int Id { get; set; }
    //    public int Position { get; set; }
    //    public string Code { get; set; }
    //    public int Number { get; set; }
    //    public string A { get; set; }
    //    public string B { get; set; }
    //    public string C { get; set; }
    //    public string D { get; set; }
    //    public string E { get; set; }
    //    public string F { get; set; }
    //    public string G1 { get; set; }
    //    public string G2 { get; set; }
    //    public string H1 { get; set; }
    //    public string H2 { get; set; }
    //    public string I1 { get; set; }
    //    public string I2 { get; set; }
    //    public string K1 { get; set; }
    //    public string K2 { get; set; }
    //    public int L1 { get; set; }
    //    public int L2 { get; set; }
    //    public int L3 { get; set; }
    //    public string L4 { get; set; }
    //    public string Connection1 { get; set; }
    //    public string Connection2 { get; set; }
    //    public string Connection3 { get; set; }
    //    public string Note { get; set; }
    //    public string ProductType { get; set; }
    //    public string UserId { get; set; }
    //    public DateTime? DateCreated { get; set; }

    //    public Project Project { get; set; }
    //}

    public class OrderItemViewModel
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string Code { get; set; }
        public int Number { get; set; }
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
        public int L1 { get; set; }
        public int L2 { get; set; }
        public int L3 { get; set; }
        public string L4 { get; set; }
        public string Connection1 { get; set; }
        public string Connection2 { get; set; }
        public string Connection3 { get; set; }
        public string Note { get; set; }
        public string Diameter1 { get; set; }
        public string Diameter2 { get; set; }
        public string Length { get; set; }

        public int ProjectId { get; set; }
        public string ProductType { get; set; }
        public string UserId { get; set; }
        public DateTime DateCreated { get; set; }
        //[NotMapped]
        //public Project Project { get; set; }
    }
}
