module.exports = function (router) {
    var directorsController = require("../controller/directors.controller");
    router.post("/directors", directorsController.get_list);
    router.post("/directors/Movie/:id", directorsController.get_director_movie);
    router.post("/directors/add", directorsController.addDirectors);
    router.delete("/directors/remove/:id", directorsController.removeDirectors);
    router.put("/directors/update", directorsController.updateDirectors);
};
