module.exports = function (router) {
    var BillController = require("../controller/bill.controller");
    router.post("/Bill", BillController.get_list);
    router.post("/Bill/getIDNew/:id", BillController.get_IDNewADD);
    router.post("/Bill/add", BillController.addBill);
    router.delete("/Bill/remove/:id", BillController.removeBill);
    router.put("/Bill/update", BillController.updateBill);
};
