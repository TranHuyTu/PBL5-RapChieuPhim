module.exports = function (router) {
    var SeatController = require("../controller/seat.controller");
    router.post("/Seat", SeatController.get_list);
    router.post("/Seat/add", SeatController.addSeat);
    router.delete("/Seat/remove/:id", SeatController.removeSeat);
    router.put("/Seat/update", SeatController.updateSeat);
};
