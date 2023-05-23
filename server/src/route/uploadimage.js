module.exports = function (router) {
    var uploadCloud = require("../config/cloundinary.config");
    var uploadController = require("../controller/uploadimage.controller");
    router.post(
        "/upload",
        uploadCloud.single("image"),
        uploadController.uploadImg,
    );
    router.post("/pathImg", uploadController.deleteImg);
};
