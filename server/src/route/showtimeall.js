module.exports = function (router) {
    var ShowtimeController = require("../controller/showtime.controller");
    router.post("/showtime/:id", ShowtimeController.get_Showtime_by_id);
    router.post("/showtime/Movie/:id", ShowtimeController.get_list_movie);
};
