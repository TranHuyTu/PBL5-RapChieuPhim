module.exports = function (router) {
    var HistoryController = require("../controller/history.controller");
    router.post("/history/ticket/:id", HistoryController.get_all_ticket);
    router.post("/history/food/:id", HistoryController.get_all_food);
};
