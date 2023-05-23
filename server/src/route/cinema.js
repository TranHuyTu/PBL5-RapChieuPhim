module.exports = function (router) {
    var CinemaController = require("../controller/cinema.controller");
    router.post("/cinema", CinemaController.get_list);
    router.post("/cinema/add", CinemaController.addCinema);
    router.delete("/cinema/remove/:id", CinemaController.removeCinema);
    router.put("/cinema/update", CinemaController.updateCinema);
};
