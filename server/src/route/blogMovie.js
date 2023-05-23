module.exports = function (router) {
    var BlogMovieController = require("../controller/blogMovie.controller");
    router.post("/BlogMovie", BlogMovieController.get_list);
};
