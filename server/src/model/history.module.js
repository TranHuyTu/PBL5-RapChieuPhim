const db = require("../common/connect");

let Ticket = function (ticket) {
    this.ID = ticket.ID;
    this.SeatNumber = ticket.SeatNumber;
    this.TicketType = ticket.TicketType;
    this.BillTime = ticket.BillTime;
    this.DayOfWeek = ticket.DayOfWeek;
    this.Price = ticket.Price;
};
let Food = function (food) {
    this.ID = food.ID;
    this.ItemName = food.ItemName;
    this.Price = food.Price;
    this.AvatarLink = food.AvatarLink;
    this.sl = food.sl;
};

Ticket.get_all = function (id, result) {
    db.query(
        "SELECT billall.ID,booked_tickets.SeatNumber,price_listing.TicketType,billall.BillTime,price_listing.DayOfWeek,price_listing.Price FROM billall,booked_tickets,price_listing WHERE billall.ID=booked_tickets.IDBillAll AND booked_tickets.IDPrice=price_listing.PriceID AND billall.IDKH = ? ORDER BY billall.ID;",
        id,
        function (err, acc) {
            if (err) {
                result(null);
            } else {
                result(acc);
            }
        },
    );
};

Food.get_all = function (id, result) {
    db.query(
        "SELECT billall.ID,fooditem.ItemName,fooditem.Price,fooditem.AvatarLink,bookfood.sl FROM billall,bookfood,fooditem WHERE billall.ID=bookfood.IDBillAll AND bookfood.IDFood=fooditem.ID AND billall.IDKH = ? ORDER BY billall.ID;",
        id,
        function (err, acc) {
            if (err) {
                result(null);
            } else {
                result(acc);
            }
        },
    );
};

module.exports = { Ticket: Ticket, Food: Food };
