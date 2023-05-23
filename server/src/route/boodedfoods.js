module.exports = function (router) {
    var BoodedFoodsController = require("../controller/bookedfoods.controller");
    router.post("/bookedfoods", BoodedFoodsController.get_list);
    router.post("/bookedfoods/add", BoodedFoodsController.addBoodedFoods);
    router.delete(
        "/bookedfoods/remove/:id",
        BoodedFoodsController.removeBoodedFoods,
    );
    router.put("/boodekfoods/update", BoodedFoodsController.updateBoodedFoods);
};
