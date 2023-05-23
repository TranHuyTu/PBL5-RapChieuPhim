module.exports = function (router) {
    var homeController = require("../controller/homepages.controller");
    var searchController = require("../controller/search.controller");

    router.post("/TrangChu", homeController.getHomePage);
    router.post("/TrangChu/Movie/:id", homeController.getDetailMovie);
    router.post("/TrangChu/Search", searchController.getSearch);
};
