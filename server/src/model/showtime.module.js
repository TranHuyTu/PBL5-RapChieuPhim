const db = require("../common/connect");

let Showtime = function (showtime) {
    this.ID = showtime.ID;
    this.HallID = showtime.HallID;
    this.CinemaID = showtime.CinemaID;
    this.CinemaName = showtime.CinemaName;
    this.ShowtimeDateTime = showtime.ShowtimeDateTime;
};
//Chưa sửa
Showtime.get_all = function (result) {
    db.query("SELECT * FROM showtimes", function (err, showtime) {
        if (err) {
            result(null);
        } else {
            result(showtime);
        }
    });
};

Showtime.get_showtime_movie = function (id, result) {
    db.query(
        "SELECT showtime.ShowtimeID, halls.HallID, cinema.ID as CinemaID, cinema.CinemaName,showtime.ShowtimeDateTime FROM showtime,movie,halls,cinema WHERE showtime.MovieID=movie.ID AND showtime.HallID=halls.HallID AND halls.CinemaID=cinema.ID AND movie.ID=? ORDER BY cinema.ID;",
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
        "SELECT showtime.ShowtimeID, halls.HallID, cinema.ID as CinemaID, cinema.CinemaName,showtime.ShowtimeDateTime FROM showtime,movie,halls,cinema WHERE showtime.MovieID=movie.ID AND showtime.HallID=halls.HallID AND halls.CinemaID=cinema.ID AND movie.ID=? AND cinema.ID=? ORDER BY cinema.ID;",
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
        "SELECT showtime.ShowtimeID, halls.HallID, cinema.ID as CinemaID, cinema.CinemaName,showtime.ShowtimeDateTime FROM showtime,movie,halls,cinema WHERE showtime.MovieID=movie.ID AND showtime.HallID=halls.HallID AND halls.CinemaID=cinema.ID AND showtime.ShowtimeID=? AND cinema.ID=?;",
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

module.exports = Showtime;
