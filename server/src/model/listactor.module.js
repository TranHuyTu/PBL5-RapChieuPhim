const db = require("../common/connect");

let ListActor = function (listactor) {
    this.ID = listactor.ID;
    this.IDMovie = listactor.IDMovie;
    this.IDActor = listactor.IDActor;
};

ListActor.create = function (data, result) {
    db.query("INSERT INTO listactor SET ?", data, function (err, actor) {
        if (err) {
            result(null);
        } else {
            result({ id: actor.insertID, ...data });
        }
    });
};

ListActor.remove = function (data, result) {
    db.query(
        "DELETE FROM listactor WHERE IDMovie = ? AND IDActor=?",
        [data.IDMovie, data.IDActor],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(data);
            }
        },
    );
};

ListActor.remove_all = function (id, result) {
    db.query(
        "DELETE FROM listactor WHERE IDMovie = ?",
        id,
        function (err, listactor) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu co id phim " + id + " thanh cong");
            }
        },
    );
};
ListActor.update = function (data, result) {
    db.query(
        "UPDATE listactor SET IDMovie=?,IDActor=? WHERE ID=?",
        [data.IDMovie, data.IDActor, data.ID],
        function (err, actor) {
            if (err) {
                result(null);
            } else {
                result({ id: actor.insertID, ...data });
            }
        },
    );
};

module.exports = ListActor;
