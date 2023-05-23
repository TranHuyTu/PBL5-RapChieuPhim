module.exports = function (router) {
    var FoodsController = require("../controller/foods.controller");
    router.post("/foods", FoodsController.get_list);
    router.post("/foods/add", FoodsController.addFoods);
    router.delete("/foods/remove/:id", FoodsController.removeFoods);
    router.put("/foods/update", FoodsController.updateFoods);
};
