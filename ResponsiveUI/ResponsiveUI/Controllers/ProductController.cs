using ResponsiveUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ResponsiveUI.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProducts()
        {
            return Json(GetMockData(), JsonRequestBehavior.AllowGet);
        }

        //public JsonResult PlaceOrder(List<CartItem> cartItems)
        //{
        //    var message = "Failed PlaceOrder";
        //    if (cartItems == null) return Json(new { message });

        //    double total = cartItems.Sum(cartItem => cartItem.Quantity * cartItem.Product.Price);
        //    message = string.Format("saved {0} items for a total of £{1}", cartItems.Count, total);
        //    return Json(new { message }, JsonRequestBehavior.AllowGet);
        //}

        private List<Product> GetMockData()
        {
            var golf = new Category() { Name = "Golf Woods", Id = 1 };
            var items = new List<Product>()
                                {
                                    new Product(){ModelId = 1, Price = 299.00,CategoryId = 1, ItemNumber = "Item1334", Description = "Titleist D13 Driver", Model = new Model(){Name = "D13", Brand = "Titleist", Id = 5 }, Category = golf, Id = 4 },
                                    new Product(){ModelId = 2, Price = 149.00, CategoryId = 1, ItemNumber = "Item34646", Description = "Taylor Made RocketBallz 3 Wood", Model = new Model(){Name = "RocketBallz", Brand = "Taylor Made", Id = 6 }, Category = golf, Id = 5 },
                                    new Product(){ModelId = 3, Price = 329.00, CategoryId = 1, ItemNumber = "Item45984", Description = "Callaway Razr Hawk", Model = new Model(){Name = "Razor Hawk", Brand = "Callaway", Id = 8 }, Category = golf, Id = 11 },
                                    new Product(){ModelId = 4, Price = 139.00, CategoryId = 1, ItemNumber = "Item523672", Description = "Ping I15 FairWay Wood", Model = new Model(){Name = "I15", Brand = "Ping", Id = 9 }, Category = golf, Id = 12 },
                                    new Product(){ModelId = 5, Price = 199.00, CategoryId = 1, ItemNumber = "Item4463", Description = "Nike ", Model = new Model(){Name = "SasQuatch", Brand = "Nike", Id = 10 }, Category = golf, Id = 13 }
                                };
            return items;
        }
    }
}