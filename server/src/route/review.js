module.exports = function (router) {
    var ReviewController = require("../controller/review.controller");
    router.post("/review", ReviewController.get_list);
    router.post("/review/add", ReviewController.addReview);
    router.delete("/review/remove/:id", ReviewController.removeReview);
    router.put("/review/update", ReviewController.updateReview);
};
