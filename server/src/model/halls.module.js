const db = require("../common/connect");

let Hall = function (hall) {
    this.ID = hall.ID;
    this.Class = hall.Class;
    this.NumSeats = hall.NumSeats;
    this.CinemaID = hall.CinemaID;
    this.IDShowtime = this.IDShowtime;
    this.HallNumber = this.HallNumber;
};
Hall.get_all = function (result) {
    db.query("SELECT * FROM halls", function (err, hall) {
        if (err) {
            result(null);
        } else {
            result(hall);
        }
    });
};

Hall.get_halls_showtime = function (id, result) {
    db.query(
        "SELECT halls.HallID,halls.HallNumber,halls.Class,halls.NumSeats,halls.CinemaID,seat.ID,seat.CheckSeat FROM halls,seat WHERE HallID=? AND seat.IDHalls=halls.HallID;",
        id,
        function (err, hall) {
            if (err || hall.length == 0) {
                result(null);
            } else {
                result(hall);
            }
        },
    );
};
Hall.get_halls_cinema = function (id, result) {
    db.query(
        "SELECT * FROM halls WHERE halls.CinemaID=?",
        id,
        function (err, hall) {
            if (err || hall.length == 0) {
                result(null);
            } else {
                result(hall);
            }
        },
    );
};

Hall.create = function (data, result) {
    db.query("INSERT INTO halls SET ?", data, function (err, hall) {
        if (err) {
            result(null);
        } else {
            result(hall);
        }
    });
};

Hall.remove = function (id, result) {
    db.query("DELETE FROM halls WHERE HallID = ?", id, function (err, hall) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu halls co id " + id + " thanh cong");
        }
    });
};

Hall.update = function (data, result) {
    db.query(
        "UPDATE halls SET Class=?,NumSeats=?,CinemaID=?,IDShowtime=?,HallNumber=? WHERE HallID=?",
        [
            data.Class,
            data.NumSeats,
            data.CinemaID,
            data.IDShowtime,
            data.HallNumber,
            data.HallID,
        ],
        function (err, hall) {
            if (err) {
                result(null);
            } else {
                result({ id: hall.insertID, ...data });
            }
        },
    );
};

module.exports = Hall;
