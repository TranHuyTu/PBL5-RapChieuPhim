const db = require("../common/connect");

let Ticket = function (ticket) {
    this.ID = ticket.ID;
    this.ShowtimeID = ticket.ShowtimeID;
    this.SeatNumber = ticket.SeatNumber;
    this.IDPrice = ticket.IDPrice;
    this.IDBillAll = ticket.IDBillAll;
};

Ticket.get_all = function (result) {
    db.query("SELECT * FROM booked_tickets", function (err, Ticket) {
        if (err) {
            result(null);
        } else {
            result(Ticket);
        }
    });
};

Ticket.get_IDNew = function (id, result) {
    db.query(
        "SELECT * FROM booked_tickets WHERE SeatNumber=?",
        id,
        function (err, Ticket) {
            if (err) {
                result(null);
            } else {
                result(Ticket);
            }
        },
    );
};

Ticket.create = function (data, result) {
    db.query("INSERT INTO booked_tickets SET ?", data, function (err, ticket) {
        if (err) {
            result(null);
        } else {
            result({ id: ticket.insertID, ...data });
        }
    });
};
Ticket.remove = function (id, result) {
    db.query(
        "DELETE FROM booked_tickets WHERE id = ?",
        id,
        function (err, Ticket) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu Tickets co id " + id + " thanh cong");
            }
        },
    );
};
Ticket.update = function (data, result) {
    db.query(
        "UPDATE booked_tickets SET ShowtimeID = ?,SeatNumber = ?,IDPrice=?,IDBillAll = ? WHERE ID=?",
        [
            data.ShowtimeID,
            data.SeatNumber,
            data.IDPrice,
            data.IDBillAll,
            data.ID,
        ],
        function (err, ticket) {
            if (err) {
                result(null);
            } else {
                result({ id: ticket.insertID, ...data });
            }
        },
    );
};

module.exports = Ticket;
