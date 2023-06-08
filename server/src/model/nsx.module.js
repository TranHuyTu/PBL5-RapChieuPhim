const db = require("../common/connect");

let NSX = function (nsx) {
    this.ID = nsx.ID;
    this.Name = nsx.Name;
    this.QuocGia = nsx.QuocGia;
    this.GioiThieu = nsx.GioiThieu;
    this.Logo = nsx.Logo;
};

NSX.get_all = function (result) {
    db.query("SELECT * FROM nsx", function (err, actor) {
        if (err) {
            result(null);
        } else {
            result(actor);
        }
    });
};

NSX.create = function (data, result) {
    db.query("INSERT INTO nsx SET ?", data, function (err, nsx) {
        if (err) {
            result(null);
        } else {
            result({ id: nsx.insertID, ...data });
        }
    });
};
NSX.remove = function (id, result) {
    db.query("DELETE FROM nsx WHERE id = ?", id, function (err, nsx) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu NSX co id " + id + " thanh cong");
        }
    });
};
NSX.update = function (data, result) {
    db.query(
        "UPDATE nsx SET Name=?,QuocGia=?,GioiThieu=?,Logo=? WHERE ID=?",
        [data.Name, data.QuocGia, data.GioiThieu, data.Logo, data.ID],
        function (err, nsx) {
            if (err) {
                result(null);
            } else {
                result({ id: nsx.insertID, ...data });
            }
        },
    );
};

module.exports = NSX;
