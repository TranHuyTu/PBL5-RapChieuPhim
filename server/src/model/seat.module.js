const db = require("../common/connect");

let Seat = function (seat) {
    this.ID = seat.ID;
    this.CheckSeat = seat.CheckSeat;
    this.IDHalls = seat.IDHalls;
};

Seat.get_all = function (result) {
    db.query("SELECT * FROM seat", function (err, Seat) {
        if (err) {
            result(null);
        } else {
            result(Seat);
        }
    });
};

Seat.create = function (data, result) {
    db.query("INSERT INTO seat SET ?", data, function (err, seat) {
        if (err) {
            result(null);
        } else {
            result({ seat });
        }
    });
};
Seat.remove = function (id, result) {
    db.query("DELETE FROM seat WHERE IDHalls = ?", id, function (err, Seat) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu Seats co id " + id + " thanh cong");
        }
    });
};
Seat.update = function (data, result) {
    db.query(
        "UPDATE seat SET CheckSeat = ?, IDHalls = ? WHERE ID=?",
        [data.CheckSeat, data.IDHalls, data.ID],
        function (err, seat) {
            if (err) {
                result(null);
            } else {
                result({ id: seat.insertID, ...data });
            }
        },
    );
};

module.exports = Seat;
