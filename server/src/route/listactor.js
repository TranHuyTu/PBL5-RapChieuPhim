module.exports = function (router) {
    var ListActorController = require("../controller/listactor.controller");
    router.post("/listactor/add", ListActorController.addActorToList);
    router.delete("/listactor/remove", ListActorController.removeListActor);
    router.delete(
        "/listactor/removetomovie/:id",
        ListActorController.removeActorToMovie,
    );
    router.put("/listactor/update", ListActorController.updateListActor);
};
