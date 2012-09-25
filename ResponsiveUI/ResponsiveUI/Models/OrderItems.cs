﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ResponsiveUI.Models
{
    public class OrderItems
    {
        public string Product { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }
    }
}