const db = require("../common/connect");

let Bill = function (bill) {
    this.ID = bill.ID;
    this.BillTime = bill.Bill;
    this.IDKH = bill.IDKH;
    this.IDNV = bill.IDNV;
};

Bill.get_all = function (result) {
    db.query("SELECT * FROM BillAll", function (err, Bill) {
        if (err) {
            result(null);
        } else {
            result(Bill);
        }
    });
};

Bill.get_IDNew = function (id, result) {
    db.query(
        "SELECT * FROM BillAll WHERE SeatNumber=?",
        id,
        function (err, Bill) {
            if (err) {
                result(null);
            } else {
                result(Bill);
            }
        },
    );
};

Bill.create = function (data, result) {
    db.query("INSERT INTO BillAll SET ?", data, function (err, bill) {
        if (err) {
            result(null);
        } else {
            result({ bill });
        }
    });
};
Bill.remove = function (id, result) {
    db.query("DELETE FROM BillAll WHERE id = ?", id, function (err, Bill) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu Bills co id " + id + " thanh cong");
        }
    });
};
Bill.update = function (data, result) {
    db.query(
        "UPDATE BillAll SET BillTime = ?, IDKH = ?, IDNV=? WHERE ID=?",
        [data.BillTime, data.IDKH, data.IDNV, data.ID],
        function (err, bill) {
            if (err) {
                result(null);
            } else {
                result({ id: bill.insertID, ...data });
            }
        },
    );
};

module.exports = Bill;
