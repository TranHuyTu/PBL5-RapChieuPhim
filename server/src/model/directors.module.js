const db = require("../common/connect");

let Directors = function (director) {
    this.ID = director.ID;
    this.Name = director.Name;
    this.Country = director.Country;
    this.AvatarLink = director.AvatarLink;
};

Directors.get_all = function (result) {
    db.query("SELECT * FROM directors", function (err, directors) {
        if (err) {
            result(null);
        } else {
            result(directors);
        }
    });
};

Directors.get_detail = function (id, result) {
    db.query(
        "SELECT * FROM directors Where id=?",
        id,
        function (err, directors) {
            if (err || directors.length == 0) {
                result(null);
            } else {
                result(directors);
            }
        },
    );
};

Directors.create = function (data, result) {
    db.query("INSERT INTO directors SET ?", data, function (err, directors) {
        if (err) {
            result(null);
        } else {
            result({ id: directors.insertID, ...data });
        }
    });
};
Directors.remove = function (id, result) {
    db.query(
        "DELETE FROM directors WHERE id = ?",
        id,
        function (err, directors) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu directors co id " + id + " thanh cong");
            }
        },
    );
};
Directors.update = function (data, result) {
    db.query(
        "UPDATE directors SET Name=?,Country=?,AvatarLink=? WHERE ID=?",
        [data.Name, data.Country, data.AvatarLink, data.ID],
        function (err, directors) {
            if (err) {
                result(null);
            } else {
                result({ id: directors.insertID, ...data });
            }
        },
    );
};

module.exports = Directors;
