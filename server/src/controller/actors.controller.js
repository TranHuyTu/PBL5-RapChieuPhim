var Actor = require("../model/actors.module");

exports.get_list = async function (req, res) {
    await Actor.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_list_actors_movie = async function (req, res) {
    await Actor.get_actors_movie(req.params.id, function (data) {
        res.send({ result: data });
    });
};
exports.addActor = async function (req, res) {
    var data = req.body;
    await Actor.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeActor = async function (req, res) {
    var id = req.params.id;
    await Actor.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateActor = async function (req, res) {
    var data = req.body;
    await Actor.update(data, function (repon) {
        res.send({ result: repon });
    });
};
