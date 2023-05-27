module.exports = function (router) {
    var NSXController = require("../controller/nsx.controller");
    router.post("/nsx", NSXController.get_list);
    router.post("/nsx/add", NSXController.addNSX);
    router.delete("/nsx/remove/:id", NSXController.removeNSX);
    router.put("/nsx/update", NSXController.updateNSX);
};
