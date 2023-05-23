module.exports = function (router) {
    var TicketController = require("../controller/booked_tickets.controller");
    router.post("/ticket", TicketController.get_list);
    router.post("/ticket/getIDNew/:id", TicketController.get_IDNewADD);
    router.post("/ticket/add", TicketController.addTicket);
    router.delete("/ticket/remove/:id", TicketController.removeTicket);
    router.put("/ticket/update", TicketController.updateTicket);
};
