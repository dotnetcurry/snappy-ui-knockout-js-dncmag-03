(function (OrdersApp) {
    "use strict";
    var serviceBase = 'http://localhost:2319/Product/',
        getSvcUrl = function (method) { return serviceBase + method; };

    OrdersApp.ajaxService = (function () {
        var ajaxGetJson = function (method, jsonIn, callback) {
            $.ajax({
                url: getSvcUrl(method),
                type: "GET",
                data: ko.toJSON(jsonIn),
                dataType: "json",
                contentType: "application/json",
                success: function (json) {
                    callback(json);
                }
            });
        },
            ajaxPostJson = function (method, jsonIn, callback) {
                $.ajax({
                    url: getSvcUrl(method),
                    type: "POST",
                    data: ko.toJSON(jsonIn),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (json) {
                        callback(json);
                    }
                });
            };
        return {
            ajaxGetJson: ajaxGetJson,
            ajaxPostJson: ajaxPostJson
        };
    })();
}(OrdersApp));