const db = require("../common/connect");

let BlogMovie = function (movie) {
    this.ID = movie.ID;
    this.MovieName = movie.MovieName;
    this.TomTat = movie.TomTat;
    this.GioiThieu = movie.GioiThieu;
    this.AvatarMovie = movie.AvatarMovie;
};

BlogMovie.get_all = function (result) {
    db.query(
        "SELECT reviews.ID,movie.MovieName,reviews.TomTat,reviews.GioiThieu,movie.AvatarMovie FROM movie,reviews WHERE movie.IDRevew = reviews.ID;",
        function (err, blogmovie) {
            if (err) {
                result(null);
            } else {
                result(blogmovie);
            }
        },
    );
};

module.exports = BlogMovie;
