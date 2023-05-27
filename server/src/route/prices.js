module.exports = function (router) {
    var PricesController = require("../controller/prices.controller");
    router.post("/price", PricesController.get_list);
    router.post("/price/all", PricesController.get_list_all);
    router.post("/price/add", PricesController.addPrices);
    router.delete("/price/remove/:id", PricesController.removePrices);
    router.put("/price/update", PricesController.updatePrices);
};
