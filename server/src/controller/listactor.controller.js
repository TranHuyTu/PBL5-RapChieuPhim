var ListActor = require("../model/listactor.module");

exports.addActorToList = function (req, res) {
    var data = req.body;
    ListActor.create(data, function (repon) {
        res.send({ result: repon });
    });
};

exports.removeListActor = function (req, res) {
    var id = req.params.id;
    ListActor.remove(id, function (repon) {
        res.send({ result: repon });
    });
};

exports.removeActorToMovie = function (req, res) {
    var id = req.params.id;
    ListActor.remove_all(id, function (repon) {
        res.send({ result: repon });
    });
};

exports.updateListActor = function (req, res) {
    var data = req.body;
    ListActor.update(data, function (repon) {
        res.send({ result: repon });
    });
};
