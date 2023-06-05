module.exports = function (router) {
    var HallsController = require("../controller/halls.controller");
    router.post("/halls", HallsController.get_list);
    router.post("/halls/showtime/:id", HallsController.get_list_seat);
    router.post("/halls/cinema/:id", HallsController.get_list_hall);
    router.post("/halls/add", HallsController.addHalls);
    router.delete("/halls/remove/:id", HallsController.removeHalls);
    router.put("/halls/update", HallsController.updateHalls);
};
