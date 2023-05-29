module.exports = function (router) {
    var MovieController = require("../controller/movie.controller");
    router.post("/movie", MovieController.get_list);
    router.post("/movie/add", MovieController.addMovie);
    router.delete("/movie/remove/:id", MovieController.removeMovie);
    router.put("/movie/update", MovieController.updateMovie);
};
