module.exports = function (router) {
    var ThongkeController = require("../controller/thongke.controller");
    router.post("/thongke", ThongkeController.get_data);
    router.post("/thongke/food", ThongkeController.get_data_food);
};
