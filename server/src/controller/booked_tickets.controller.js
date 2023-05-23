var Ticket = require("../model/booked_tickets.module");

exports.get_list = function (req, res) {
    Ticket.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_IDNewADD = function (req, res) {
    var id = req.params.id;
    Ticket.get_IDNew(id, function (data) {
        res.send({ result: data });
    });
};
exports.addTicket = function (req, res) {
    var data = req.body;
    Ticket.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeTicket = function (req, res) {
    var id = req.params.id;
    Ticket.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateTicket = function (req, res) {
    var data = req.body;
    Ticket.update(data, function (repon) {
        res.send({ result: repon });
    });
};
