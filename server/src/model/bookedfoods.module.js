const db = require("../common/connect");

let BoodedFoods = function (boodedfood) {
    this.ID = boodedfood.ID;
    this.IDFood = boodedfood.IDFood;
    this.SL = boodedfood.SL;
    this.IDBillAll = boodedfood.IDBillAll;
};

BoodedFoods.get_all = function (result) {
    db.query("SELECT * FROM bookfood", function (err, BoodFoods) {
        if (err) {
            result(null);
        } else {
            result(BoodFoods);
        }
    });
};

BoodedFoods.create = function (data, result) {
    db.query("INSERT INTO bookfood SET ?", data, function (err, BoodFoods) {
        if (err) {
            result(null);
        } else {
            result({ id: BoodFoods.insertID, ...data });
        }
    });
};
BoodedFoods.remove = function (id, result) {
    db.query(
        "DELETE FROM bookfood WHERE id = ?",
        id,
        function (err, BoodFoods) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu fooditem co id " + id + " thanh cong");
            }
        },
    );
};
BoodedFoods.update = function (data, result) {
    db.query(
        "UPDATE fooditem SET IDFood=?,SL=?,IDBillAll=? WHERE ID=?",
        [data.IDFood, data.SL, data.IDBillAll, data.ID],
        function (err, BoodFoods) {
            if (err) {
                result(null);
            } else {
                result({ id: BoodFoods.insertID, ...data });
            }
        },
    );
};

module.exports = BoodedFoods;
