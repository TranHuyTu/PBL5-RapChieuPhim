module.exports = function (router) {
    var BlogController = require("../controller/blogFilm.controller");
    router.post("/Blog", BlogController.get_list);
    router.post("/Blog/add", BlogController.addBlog);
    router.delete("/Blog/remove/:id", BlogController.removeBlog);
    router.put("/Blog/update", BlogController.updateBlog);
    router.put("/Blog/update/like", BlogController.updateBlogLike);
};
