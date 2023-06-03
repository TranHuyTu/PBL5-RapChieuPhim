const db = require("../common/connect");

let Showtime = function (showtime) {
    this.ID = showtime.ID;
    this.HallID = showtime.HallID;
    this.HallNumber = showtime.HallNumber;
    this.CinemaID = showtime.CinemaID;
    this.CinemaName = showtime.CinemaName;
    this.ShowtimeDateTime = showtime.ShowtimeDateTime;
};
let ShowtimeAll = function (showtime) {
    this.ID = showtime.ID;
    this.MovieID = showtime.MovieID;
    this.MovieName = showtime.MovieName;
    this.HallID = showtime.HallID;
    this.Class = showtime.Class;
    this.NumSeats = showtime.NumSeats;
    this.CinemaID = showtime.CinemaID;
    this.ShowtimeDateTime = showtime.ShowtimeDateTime;
};
ShowtimeAll.get_all = function (result) {
    db.query(
        "SELECT showtime.ShowtimeID,showtime.MovieID,movie.MovieName,halls.HallID,halls.HallNumber,halls.Class,halls.NumSeats,halls.CinemaID,showtime.ShowtimeDateTime FROM showtime,movie,halls WHERE showtime.MovieID = movie.ID AND showtime.ShowtimeID=halls.IDShowtime;",
        function (err, showtime) {
            if (err) {
                result(null);
            } else {
                result(showtime);
            }
        },
    );
};

Showtime.get_showtime_movie = function (id, result) {
    db.query(
        "SELECT showtime.ShowtimeID, halls.HallID, halls.HallNumber, cinema.ID as CinemaID, cinema.CinemaName,showtime.ShowtimeDateTime FROM showtime,movie,halls,cinema WHERE showtime.MovieID=movie.ID AND showtime.ShowtimeID=halls.IDShowtime AND halls.CinemaID=cinema.ID AND movie.ID=? ORDER BY cinema.ID;",
        id,
        function (err, showtime) {
            if (err || showtime.length == 0) {
                result(null);
            } else {
                result(showtime);
            }
        },
    );
};
Showtime.get_showtime_movie_cinema = function (data, result) {
    db.query(
        "SELECT showtime.ShowtimeID, halls.HallID, cinema.ID as CinemaID, cinema.CinemaName,showtime.ShowtimeDateTime FROM showtime,movie,halls,cinema WHERE showtime.MovieID=movie.ID AND showtime.ShowtimeID=halls.IDShowtime AND halls.CinemaID=cinema.ID AND movie.ID=? AND cinema.ID=? ORDER BY cinema.ID;",
        [data.MovieID, data.CinemaID],
        function (err, showtime) {
            if (err) {
                result(null);
            } else {
                result(showtime);
            }
        },
    );
};

Showtime.get_detail_showtime = function (data, result) {
    db.query(
        "SELECT showtime.ShowtimeID, halls.HallID,cinema.ID as CinemaID, cinema.CinemaName,showtime.ShowtimeDateTime FROM showtime,movie,halls,cinema WHERE showtime.MovieID=movie.ID AND showtime.ShowtimeID=halls.IDShowtime AND halls.CinemaID=cinema.ID AND showtime.ShowtimeID=? AND cinema.ID=?;",
        [data.ShowtimeID, data.CinemaID],
        function (err, showtime) {
            if (err) {
                result(null);
            } else {
                result(showtime);
            }
        },
    );
};

//Chưa sửa
Showtime.create = function (data, result) {
    db.query("INSERT INTO showtimes SET ?", data, function (err, showtime) {
        if (err) {
            result(null);
        } else {
            result({ id: showtime.insertID, ...data });
        }
    });
};
//Chưa sửa
Showtime.remove = function (id, result) {
    db.query(
        "DELETE FROM showtimes WHERE id = ?",
        id,
        function (err, showtime) {
            if (err) {
                result(null);
            } else {
                result("Xoa du lieu showtimes co id " + id + " thanh cong");
            }
        },
    );
};
//Chưa sửa
Showtime.update = function (data, result) {
    db.query(
        "UPDATE showtimes SET Name=?,Country=?,AvatarLink=? WHERE ID=?",
        [data.Name, data.Country, data.AvatarLink, data.ID],
        function (err, showtime) {
            if (err) {
                result(null);
            } else {
                result({ id: showtime.insertID, ...data });
            }
        },
    );
};

module.exports = { Showtime: Showtime, ShowtimeAll: ShowtimeAll };
