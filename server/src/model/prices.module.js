const db = require("../common/connect");

let Prices = function (food) {
    this.PriceID = food.ID;
    this.TicketType = food.TicketType;
    this.DayOfWeek = food.DayOfWeek;
    this.Price = food.Price;
};

Prices.get_all = function (result) {
    // Khai báo đối tượng Date
    var date = new Date();

    // Lấy số thứ tự của ngày hiện tại
    var current_day = date.getDay();

    // Biến lưu tên của thứ
    var day_name = "";

    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = "Sunday";
            break;
        case 1:
            day_name = "Monday";
            break;
        case 2:
            day_name = "Tuesday";
            break;
        case 3:
            day_name = "Wednesday";
            break;
        case 4:
            day_name = "Thursday";
            break;
        case 5:
            day_name = "Friday";
            break;
        case 6:
            day_name = "Saturday";
    }
    db.query(
        "SELECT * FROM price_listing WHERE DayOfWeek= ?",
        day_name,
        function (err, Prices) {
            if (err) {
                result(null);
            } else {
                result(Prices);
            }
        },
    );
};

Prices.get_ticket = function (result) {
    db.query("SELECT * FROM price_listing", function (err, Prices) {
        if (err) {
            result(null);
        } else {
            result(Prices);
        }
    });
};

Prices.create = function (data, result) {
    db.query("INSERT INTO price_listing SET ?", data, function (err, Prices) {
        if (err) {
            result(null);
        } else {
            result({ id: Prices.insertID, ...data });
        }
    });
};
Prices.remove = function (id, result) {
    db.query(
        "DELETE FROM price_listing WHERE id = ?",
        id,
        function (err, Prices) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu fooditem co id " + id + " thanh cong");
            }
        },
    );
};
Prices.update = function (data, result) {
    db.query(
        "UPDATE price_listing SET TicketType=?,DayOfWeek=?,Price=? WHERE PriceID=?",
        [data.TicketType, data.DayOfWeek, data.Price, data.PriceID],
        function (err, Prices) {
            if (err) {
                result(null);
            } else {
                result({ id: Prices.insertID, ...data });
            }
        },
    );
};

module.exports = Prices;
