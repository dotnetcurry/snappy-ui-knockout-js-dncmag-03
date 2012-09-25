(function (OrdersApp) {
    "use strict";
    OrdersApp.shoppingDataService = {
        getProducts : function (callback) {
            OrdersApp.ajaxService.ajaxGetJson("GetProducts", null, callback);
        }
    };
}(OrdersApp));