using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ResponsiveUI.Models
{
    public class CartItem
    {
        public double ExtPrice { get; set; }
        public int Quantity { get; set; }
        public Product Product { get; set; }
    }
}