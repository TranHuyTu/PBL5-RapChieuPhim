module.exports = function (router) {
    var loginController = require("../controller/login.controller");
    var JWT = require("../common/_JWT");

    router.post("/login", loginController.login);
    router.post("/register", loginController.register);
    router.put("/updatePass", loginController.updatePassword);
    router.post("/login/check_token", async function (req, res) {
        try {
            var _token = req.headers.authorization;
            const data = await JWT.check(_token);
            res.send({ data });
        } catch (error) {
            res.send({ data: "Ma token not found" });
        }
    });
};
