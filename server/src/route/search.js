module.exports = function (router) {
    var SearchController = require("../controller/searchdetailall.controller");
    router.post("/search/actor/:val", SearchController.getSearch);
    router.post("/search/director/:val", SearchController.getSearchDirector);
    router.post("/search/movie/:val", SearchController.getSearchMovie);
};
