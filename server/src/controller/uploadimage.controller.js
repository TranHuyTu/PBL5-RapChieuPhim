const cloudinary = require("cloudinary").v2;

exports.uploadImg = function (req, res) {
    try {
        const fileData = req.file;
        console.log(fileData);
        return res.status(200).json(fileData.path);
    } catch (error) {
        return interalServerError(error);
    }
};
exports.deleteImg = function (req, res) {
    var data = req.body;
    // console.log(cloudinary.url(data.url));
    // Xoa 1 file
    // cloudinary.uploader.destroy(imageUrl);
    // Xoa nhieu file
    cloudinary.api.delete_resources_by_prefix(
        data.imageUrl,
        function (error, result) {
            if (error) {
                console.error(error);
            } else {
                console.log(result);
                return res.status(200).json("OK");
            }
        },
    );
};
