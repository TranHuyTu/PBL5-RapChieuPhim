var Promotion = require("../model/promotions.module");

exports.get_list = async function (req, res) {
    await Promotion.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_list_actors_movie = async function (req, res) {
    await Promotion.get_promotion_id(req.params.id, function (data) {
        res.send({ result: data });
    });
};
exports.addPromotion = async function (req, res) {
    var data = req.body;
    await Promotion.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removePromotion = async function (req, res) {
    var id = req.params.id;
    await Promotion.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updatePromotion = async function (req, res) {
    var data = req.body;
    await Promotion.update(data, function (repon) {
        res.send({ result: repon });
    });
};
