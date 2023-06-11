var Thongke = require("../model/thongke.module");

exports.get_data = function (req, res) {
    Thongke.thongke.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_data_food = function (req, res) {
    Thongke.thongkefood.get_all_food(function (data) {
        res.send({ result: data });
    });
};
