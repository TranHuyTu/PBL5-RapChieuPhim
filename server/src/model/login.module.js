const db = require("../common/connect");

let Users = function (user) {
    this.ID = user.ID;
    // this.Username = user.Username;
    // this.Password = user.Password;
    this.Name = user.Name;
    this.Email = user.Email;
    this.CheckAdmin = user.CheckAdmin;
    this.Money = user.Money;
    this.SDT = user.SDT;
    this.SEX = user.SEX;
    this.DateOfBirth = user.DateOfBirth;
};
Users.loginModule = function (data, result) {
    db.query(
        "SELECT * FROM users WHERE Email= ? AND Password= ?",
        [data.Email, data.password],
        function (err, user) {
            if (err) {
                result(null);
            } else {
                result(user[0]);
            }
        },
    );
};
Users.create = function (data, result) {
    db.query(
        "INSERT INTO users (Username, Password, Name, Email, CheckAdmin, Money, SDT, SEX, DateOfBirth) VALUES (?,?,?,?,0,0,?,?,?)",
        [
            data.Username,
            data.Password,
            data.Name,
            data.Email,
            data.SDT,
            data.SEX,
            data.DateOfBirth,
        ],
        function (err, user) {
            if (err) {
                result(null);
            } else {
                result({ id: user.insertID, ...data });
            }
        },
    );
};
Users.update = function (data, result) {
    db.query(
        "UPDATE users SET Password= ? WHERE ID=?",
        [data.Password, data.ID],
        function (err, user) {
            if (err) {
                result(null);
            } else {
                result("Update Thanh cong password" + data);
            }
        },
    );
};

module.exports = Users;
