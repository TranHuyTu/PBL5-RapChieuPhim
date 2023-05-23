var BoodedFoods = require("../model/bookedfoods.module");

exports.get_list = function (req, res) {
    BoodedFoods.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addBoodedFoods = function (req, res) {
    var data = req.body;
    BoodedFoods.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeBoodedFoods = function (req, res) {
    var id = req.params.id;
    BoodedFoods.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateBoodedFoods = function (req, res) {
    var data = req.body;
    BoodedFoods.update(data, function (repon) {
        res.send({ result: repon });
    });
};
