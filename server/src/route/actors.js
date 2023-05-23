module.exports = function (router) {
    var ActorsController = require("../controller/actors.controller");
    router.post("/actors", ActorsController.get_list);
    router.post("/actors/Movie/:id", ActorsController.get_list_actors_movie);
    router.post("/actors/add", ActorsController.addActor);
    router.delete("/actors/remove/:id", ActorsController.removeActor);
    router.put("/actors/update", ActorsController.updateActor);
};
