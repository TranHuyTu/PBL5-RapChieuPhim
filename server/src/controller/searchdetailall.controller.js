var SearchAll = require("../model/searchdetailall.module");

exports.getSearch = function (req, res) {
    var val = req.params.val;
    SearchAll.get_detail_all(val, function (data) {
        res.send({ result: data });
    });
};
