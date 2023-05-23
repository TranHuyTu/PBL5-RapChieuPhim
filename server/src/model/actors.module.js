const db = require("../common/connect");

let Actor = function (actor) {
    this.ID = actor.ID;
    this.Name = actor.Name;
    this.Country = actor.Country;
    this.AvatarLink = actor.AvatarLink;
};

Actor.get_all = function (result) {
    db.query("SELECT * FROM actors", function (err, actor) {
        if (err) {
            result(null);
        } else {
            result(actor);
        }
    });
};

Actor.get_actors_movie = function (id, result) {
    db.query(
        "SELECT actors.ID,actors.Name,actors.Country,actors.AvatarLink FROM actors,listactor WHERE actors.ID=listactor.IDActor AND listactor.IDMovie=?",
        id,
        function (err, actor) {
            if (err || actor.length == 0) {
                result(null);
            } else {
                result(actor);
            }
        },
    );
};

Actor.create = function (data, result) {
    db.query("INSERT INTO actors SET ?", data, function (err, actor) {
        if (err) {
            result(null);
        } else {
            result({ id: actor.insertID, ...data });
        }
    });
};
Actor.remove = function (id, result) {
    db.query("DELETE FROM actors WHERE id = ?", id, function (err, actor) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu Actors co id " + id + " thanh cong");
        }
    });
};
Actor.update = function (data, result) {
    db.query(
        "UPDATE actors SET Name=?,Country=?,AvatarLink=? WHERE ID=?",
        [data.Name, data.Country, data.AvatarLink, data.ID],
        function (err, actor) {
            if (err) {
                result(null);
            } else {
                result({ id: actor.insertID, ...data });
            }
        },
    );
};

module.exports = Actor;
