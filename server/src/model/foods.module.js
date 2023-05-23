const db = require("../common/connect");

let Foods = function (food) {
    this.ID = food.ID;
    this.ItemName = food.ItemName;
    this.Price = food.Price;
    this.Description = food.Description;
    this.AvatarLink = food.AvatarLink;
};

Foods.get_all = function (result) {
    db.query("SELECT * FROM fooditem", function (err, Foods) {
        if (err) {
            result(null);
        } else {
            result(Foods);
        }
    });
};

Foods.create = function (data, result) {
    db.query("INSERT INTO fooditem SET ?", data, function (err, Foods) {
        if (err) {
            result(null);
        } else {
            result({ id: Foods.insertID, ...data });
        }
    });
};
Foods.remove = function (id, result) {
    db.query("DELETE FROM fooditem WHERE id = ?", id, function (err, Foods) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu fooditem co id " + id + " thanh cong");
        }
    });
};
Foods.update = function (data, result) {
    db.query(
        "UPDATE fooditem SET ItemName=?,Price=?,Description=?,AvatarLink=? WHERE ID=?",
        [data.ItemName, data.Price, data.Description, data.AvatarLink, data.ID],
        function (err, Foods) {
            if (err) {
                result(null);
            } else {
                result({ id: Foods.insertID, ...data });
            }
        },
    );
};

module.exports = Foods;
