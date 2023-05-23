module.exports = function (router) {
    var AccountController = require("../controller/account.controller");
    router.post("/account", AccountController.get_list);
    router.put("/account/update", AccountController.updateUser);
};
