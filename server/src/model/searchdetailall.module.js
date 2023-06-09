const db = require("../common/connect");

let SearchAll = function (search) {
    this.IDMovie = search.IDMovie;
    this.MovieName = search.MovieName;
    this.IDShowtime = search.IDShowtime;
    this.ShowtimeDateTime = search.ShowtimeDateTime;
    this.IDCinema = search.IDCinema;
    this.CinemaName = search.CinemaName;
    this.Address = search.Address;
};

SearchAll.get_detail_all = function (char, result) {
    db.query(
        "SELECT * FROM actors,listactor,movie WHERE actors.ID=listactor.IDActor AND listactor.IDMovie=movie.ID AND actors.Name LIKE '%" +
            char +
            "%' ORDER BY actors.ID;",
        char,
        function (err, detail) {
            if (err) {
                result(null);
            } else {
                result(detail);
            }
        },
    );
};
SearchAll.get_detail_all_director = function (char, result) {
    db.query(
        "SELECT * FROM directors,movie WHERE directors.ID=movie.IDDirector AND directors.Name LIKE '%" +
            char +
            "%' ORDER BY directors.ID;",
        char,
        function (err, detail) {
            if (err) {
                result(null);
            } else {
                result(detail);
            }
        },
    );
};
SearchAll.get_detail_all_movie = function (char, result) {
    db.query(
        "SELECT * FROM movie WHERE movie.MovieName LIKE '%" +
            char +
            "%' ORDER BY movie.ID;",
        char,
        function (err, detail) {
            if (err) {
                result(null);
            } else {
                result(detail);
            }
        },
    );
};
module.exports = SearchAll;
