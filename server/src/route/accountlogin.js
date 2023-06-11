module.exports = function (router) {
    var AccountController = require("../controller/accountlogin.controller");
    router.post("/accountlogin/:email", AccountController.get_list);
    router.put("/accountlogin/update", AccountController.updateUser);
};
