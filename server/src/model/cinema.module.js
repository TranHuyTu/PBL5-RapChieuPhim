const db = require("../common/connect");

let Cinema = function (cinema) {
    this.ID = cinema.ID;
    this.CinemaName = cinema.CinemaName;
    this.Address = cinema.Address;
    this.Phone = cinema.Phone;
};

Cinema.get_all = function (result) {
    db.query("SELECT * FROM cinema", function (err, data) {
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
};

Cinema.create = function (data, result) {
    db.query("INSERT INTO cinema SET ?", data, function (err, cinema) {
        if (err) {
            result(null);
        } else {
            result(cinema);
        }
    });
};
Cinema.remove = function (id, result) {
    db.query("DELETE FROM cinema WHERE id = ?", id, function (err, cinema) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu cinema co id " + id + " thanh cong");
        }
    });
};
Cinema.update = function (data, result) {
    db.query(
        "UPDATE cinema SET CinemaName=?,Address=?,Phone=? WHERE ID=?",
        [data.CinemaName, data.Address, data.Phone, data.ID],
        function (err, cinema) {
            if (err) {
                result(null);
            } else {
                result({ id: cinema.insertID, ...data });
            }
        },
    );
};

module.exports = Cinema;
