$(function () {

    // function helper 
    OrdersApp.formatCurrency = function (value) {
        return "£" + value.toFixed(2);
    };

    // for creating (guitar) Model Models :)
    OrdersApp.Model = function () {
        this.id = ko.observable();
        this.brand = ko.observable();
        this.name = ko.observable();
    };

    OrdersApp.Category = function () {
        this.id = ko.observable();
        this.name = ko.observable();
    };

    OrdersApp.objectInArray = function (searchFor, property) {
        var retVal = false;
        $.each(this, function (index, item) {
            if (item.hasOwnProperty(property)) {
                if (item[property]() === searchFor) {
                    retVal = item[property];
                    return retVal;
                }
            }
        });
        return retVal;
    };
    Array.prototype.objectInArray = OrdersApp.objectInArray;

    // for creating Product Models
    OrdersApp.Product = function (selectedItem) {
        var self = this;
        self.id = ko.observable();
        self.price = ko.observable();
        self.model = ko.observable();
        self.category = ko.observable();
        self.description = ko.observable();
        self.isSelected = ko.computed(function () {
            return selectedItem() === self;
        });
        self.shortDesc = ko.computed(function () {
            return this.model() ? this.model().brand() + " " + this.model().name() : "";
        }, self),
        self.stateHasChanged = ko.observable(false);
    };

    OrdersApp.CartItem = function () {
        var self = this;
        self.product = ko.observable();
        self.quantity = ko.observable();
        self.extPrice = ko.computed(function () {
            return this.product() ? this.product().price() * this.quantity() : 0;
        }, self);
    };

    // The ViewModel
    OrdersApp.vm = function () {
            defaultAnimationSpeed = 500,
            products = ko.observableArray([]),
            selectedProduct = ko.observable(),
            sortFunction = function (a, b) {
                return a.shortDesc().toLowerCase() > b.shortDesc().toLowerCase() ? 1 : -1;
            },
            selectProduct = function (p) {
                selectedProduct(p);
            },
            hideItem = function (elem) {
                if (elem.nodeType === 1) {
                    var effect = function () {
                        return $(elem).fadeOut(defaultAnimationSpeed);
                    };
                    effect();
                }
            },
            showItem = function (elem) {
                if (elem.nodeType === 1) {
                    var effect = function () {
                        return $(elem).hide().fadeIn(defaultAnimationSpeed);
                    };
                    effect();
                }
            },
            shoppingCart = ko.observableArray([]),
            addToCart = function (product) {
                if (!shoppingCart().objectInArray(product, "product")) {
                    var cartItem = new OrdersApp.CartItem()
                                                .product(product)
                                                .quantity(1);
                    shoppingCart.push(cartItem);
                    products.remove(product);
                }
            },
            removeFromCart = function (cartItem) {
                if (shoppingCart().indexOf(cartItem) > -1) {
                    products.push(cartItem.product());
                    shoppingCart.remove(cartItem);
                }
            },
            grandTotal = ko.computed(function () {
                var total = 0;
                $.each(shoppingCart(), function () {
                    total += this.extPrice();
                });
                return total;
            }),
            loadProductsCallback = function (json) {
                $.each(json, function (i, p) {
                    products.push(new OrdersApp.Product(selectedProduct)
                            .id(p.Id)
                            .price(p.Price)
                            .category(new OrdersApp.Category()
                            .id(p.Category.Id)
                            .name(p.Category.Name)
                                )
                            .model(new OrdersApp.Model()
                            .id(p.Model.Id)
                            .name(p.Model.Name)
                            .brand(p.Model.Brand)
                                )
                            .description(p.Description)
                            .stateHasChanged(false)
                    );
                });
                products.sort(sortFunction);
            },
            loadProducts = function () {
                OrdersApp.shoppingDataService.getProducts(OrdersApp.vm.loadProductsCallback);
            },
            placeOrderCallback = function (json) {
                dialogOptions.title("Place Order").text(json.message).open(true);
            },
            placeOrder = function () {
                alert("Placed Order!");
            };
        return {
            selectedProduct: selectedProduct,
            selectProduct: selectProduct,
            products: products,
            loadProductsCallback: loadProductsCallback,
            loadProducts: loadProducts,
            placeOrderCallback: placeOrderCallback,
            placeOrder: placeOrder,
            hideItem: hideItem,
            showItem: showItem,
            shoppingCart: shoppingCart,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            grandTotal: grandTotal
        };
    }();
    
    OrdersApp.vm.loadProducts();
    ko.applyBindings(OrdersApp.vm);
});