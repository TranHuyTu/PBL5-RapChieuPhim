var Search = require("../model/search.module");

exports.getSearch = function (req, res) {
    Search.get_all_list(function (data) {
        res.send({ result: data });
    });
};
