var NSX = require("../model/nsx.module");

exports.get_list = async function (req, res) {
    await NSX.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addNSX = async function (req, res) {
    var data = req.body;
    await NSX.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeNSX = async function (req, res) {
    var id = req.params.id;
    await NSX.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateNSX = async function (req, res) {
    var data = req.body;
    await Actor.update(data, function (repon) {
        res.send({ result: repon });
    });
};
