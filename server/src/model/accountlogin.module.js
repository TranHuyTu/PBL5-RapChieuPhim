const db = require("../common/connect");

let account = function (account) {
    this.ID = account.ID;
    this.Username = account.Username;
    this.Password = account.Password;
    this.Name = account.Name;
    this.Email = account.Email;
    this.CheckAdmin = account.CheckAdmin;
    this.Money = account.Money;
    this.SDT = account.SDT;
    this.SEX = account.SEX;
    this.DateOfBirth = account.DateOfBirth;
    this.Avatar = account.Avatar;
};

account.get_all = function (email, result) {
    db.query("SELECT * FROM users WHERE Email=?", email, function (err, acc) {
        if (err) {
            result(err);
        } else {
            result(acc);
        }
    });
};

account.update = function (data, result) {
    db.query(
        "UPDATE users SET Username=? ,Password=? ,Name=? ,Email=? ,CheckAdmin=? ,Money=? ,SDT=? ,SEX=? ,DateOfBirth=? ,Avatar= ? WHERE ID=?",
        [
            data.Username,
            data.Password,
            data.Name,
            data.Email,
            data.CheckAdmin,
            data.Money,
            data.SDT,
            data.SEX,
            data.DateOfBirth,
            data.Avatar,
            data.ID,
        ],
        function (err, actor) {
            if (err) {
                result(err);
            } else {
                result({ id: actor.insertID, ...data });
            }
        },
    );
};

module.exports = account;
