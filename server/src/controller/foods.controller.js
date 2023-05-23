var Foods = require("../model/foods.module");

exports.get_list = function (req, res) {
    Foods.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addFoods = function (req, res) {
    var data = req.body;
    Foods.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeFoods = function (req, res) {
    var id = req.params.id;
    Foods.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateFoods = function (req, res) {
    var data = req.body;
    Foods.update(data, function (repon) {
        res.send({ result: repon });
    });
};
