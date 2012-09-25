using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ResponsiveUI.Models
{
    public class Product
    {
        public long Id { get; set; }
        public long ModelId { get; set; }
        public double Price { get; set; }
        public int Rating { get; set; }
        public string Photo { get; set; }
        public long CategoryId { get; set; }
        public string ItemNumber { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public Model Model { get; set; }
    }
}