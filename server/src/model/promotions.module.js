const db = require("../common/connect");

let Promotions = function (promotion) {
    this.ID = promotion.ID;
    this.Title = promotion.Title;
    this.Content = promotion.Content;
    this.Start_time = promotion.Start_time;
    this.End_time = promotion.End_time;
    this.AvatarLink = promotion.AvatarLink;
};

Promotions.get_all = function (result) {
    db.query("SELECT * FROM promotions", function (err, promotion) {
        if (err) {
            result(null);
        } else {
            result(promotion);
        }
    });
};

Promotions.get_promotion_id = function (id, result) {
    db.query(
        "SELECT * FROM promotions WHERE ID=?",
        id,
        function (err, promotion) {
            if (err || promotion.length == 0) {
                result(null);
            } else {
                result(promotion);
            }
        },
    );
};

Promotions.create = function (data, result) {
    db.query("INSERT INTO promotions SET ?", data, function (err, promotion) {
        if (err) {
            result(null);
        } else {
            result({ id: promotion.insertID, ...promotion });
        }
    });
};
Promotions.remove = function (id, result) {
    db.query(
        "DELETE FROM promotions WHERE ID = ?",
        id,
        function (err, promotion) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu Promotionss co id " + id + " thanh cong");
            }
        },
    );
};
Promotions.update = function (data, result) {
    db.query(
        "UPDATE promotions SET Title=?,Content=?,Start_time=?,End_time=?,AvatarLink=? WHERE ID=?",
        [
            data.Title,
            data.Content,
            data.Start_time,
            data.End_time,
            data.AvatarLink,
            data.ID,
        ],
        function (err, actor) {
            if (err) {
                result(null);
            } else {
                result({ id: actor.insertID, ...data });
            }
        },
    );
};

module.exports = Promotions;
