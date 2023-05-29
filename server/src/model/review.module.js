const db = require("../common/connect");

let Review = function (review) {
    this.ID = review.ID;
    this.TomTat = review.TomTat;
    this.LinkReview = review.LinkReview;
    this.GioiThieu = review.GioiThieu;
};

Review.get_all = function (result) {
    db.query("SELECT * FROM reviews", function (err, review) {
        if (err) {
            result(null);
        } else {
            result(review);
        }
    });
};

Review.create = function (data, result) {
    db.query("INSERT INTO reviews SET ?", data, function (err, review) {
        if (err) {
            result(null);
        } else {
            result(review);
        }
    });
};
Review.remove = function (id, result) {
    db.query("DELETE FROM reviews WHERE id = ?", id, function (err, review) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu Reviews co id " + id + " thanh cong");
        }
    });
};
Review.update = function (data, result) {
    db.query(
        "UPDATE reviews SET TomTat = ?, LinkReview = ?, GioiThieu=? WHERE ID=?",
        [data.TomTat, data.LinkReview, data.GioiThieu, data.ID],
        function (err, review) {
            if (err) {
                result(null);
            } else {
                result({ id: review.insertID, ...data });
            }
        },
    );
};

module.exports = Review;
