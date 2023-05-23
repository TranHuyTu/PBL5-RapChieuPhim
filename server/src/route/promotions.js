module.exports = function (router) {
    var PromotionController = require("../controller/promotions.controller");
    router.post("/promotion", PromotionController.get_list);
    router.post("/promotion/:id", PromotionController.get_list_actors_movie);
    router.post("/promotion/add", PromotionController.addPromotion);
    router.delete("/promotion/remove/:id", PromotionController.removePromotion);
    router.put("/promotion/update", PromotionController.updatePromotion);
};
