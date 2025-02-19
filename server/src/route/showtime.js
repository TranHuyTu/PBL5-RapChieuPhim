module.exports = function (router) {
    var ShowtimeController = require("../controller/showtime.controller");
    router.post("/showtime", ShowtimeController.get_list);
    router.post("/showtime/time", ShowtimeController.get_list_time);
    router.post("/showtime/detail", ShowtimeController.get_Detail_Showtime);
    router.post("/showtime/add", ShowtimeController.addShowtime);
    router.delete("/showtime/remove/:id", ShowtimeController.removeShowtime);
    router.put("/showtime/update", ShowtimeController.updateShowtime);
};
