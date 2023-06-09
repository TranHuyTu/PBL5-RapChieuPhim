var SearchAll = require("../model/searchdetailall.module");

exports.getSearch = function (req, res) {
    var val = req.params.val;
    SearchAll.get_detail_all(val, function (data) {
        res.send({ result: data });
    });
};
exports.getSearchDirector = function (req, res) {
    var val = req.params.val;
    SearchAll.get_detail_all_director(val, function (data) {
        res.send({ result: data });
    });
};
exports.getSearchMovie = function (req, res) {
    var val = req.params.val;
    SearchAll.get_detail_all_movie(val, function (data) {
        res.send({ result: data });
    });
};
