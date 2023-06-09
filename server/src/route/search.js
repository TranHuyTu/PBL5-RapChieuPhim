module.exports = function (router) {
    var SearchController = require("../controller/searchdetailall.controller");
    router.post("/search/actor/:val", SearchController.getSearch);
};
