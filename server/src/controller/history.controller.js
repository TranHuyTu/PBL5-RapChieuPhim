var History = require("../model/history.module");

exports.get_all_ticket = function (req, res) {
    var id = req.params.id;
    History.Ticket.get_all(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.get_all_food = function (req, res) {
    var id = req.params.id;
    History.Food.get_all(id, function (repon) {
        res.send({ result: repon });
    });
};
