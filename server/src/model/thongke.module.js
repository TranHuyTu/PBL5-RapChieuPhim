const db = require("../common/connect");

let thongke = function (statistical) {
    this.BillTime = statistical.BillTime;
    this.IDKH = statistical.IDKH;
    this.TicketType = statistical.TicketType;
    this.Price = statistical.Price;
};
let thongkefood = function (statistical) {
    this.BillTime = statistical.BillTime;
    this.IDKH = statistical.IDKH;
    this.ItemName = statistical.TicketType;
    this.Price = statistical.Price;
    this.sl = statistical.sl;
};
thongke.get_all = function (result) {
    db.query(
        "SELECT billall.BillTime,billall.IDKH,price_listing.TicketType,price_listing.Price FROM billall,booked_tickets,price_listing WHERE billall.ID =booked_tickets.IDBillAll AND booked_tickets.IDPrice=price_listing.PriceID;",
        function (err, statistical) {
            if (err) {
                result(null);
            } else {
                result(statistical);
            }
        },
    );
};
thongkefood.get_all_food = function (result) {
    db.query(
        "SELECT billall.BillTime,billall.IDKH,fooditem.ItemName,fooditem.Price,bookfood.sl FROM billall,fooditem,bookfood WHERE billall.ID =bookfood.IDBillAll AND bookfood.IDFood=fooditem.ID;",
        function (err, statistical) {
            if (err) {
                result(null);
            } else {
                result(statistical);
            }
        },
    );
};

module.exports = { thongke: thongke, thongkefood: thongkefood };
