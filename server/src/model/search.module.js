const db = require("../common/connect");

let Search = function (search) {
    this.IDMovie = search.IDMovie;
    this.MovieName = search.MovieName;
    this.IDShowtime = search.IDShowtime;
    this.ShowtimeDateTime = search.ShowtimeDateTime;
    this.IDCinema = search.IDCinema;
    this.CinemaName = search.CinemaName;
    this.Address = search.Address;
};

Search.get_all_list = function (result) {
    db.query(
        "SELECT movie.ID as MovieID, movie.MovieName,halls.HallID,halls.HallNumber,halls.Class,halls.NumSeats,showtime.ShowtimeID,showtime.ShowtimeDateTime,cinema.ID as CinemaID,cinema.CinemaName,cinema.Address FROM movie,showtime,halls,cinema WHERE movie.ID=showtime.MovieID AND showtime.ShowtimeID=halls.IDShowtime AND halls.CinemaID=cinema.ID",
        function (err, movie) {
            if (err) {
                result(null);
            } else {
                result(movie);
            }
        },
    );
};

module.exports = Search;
