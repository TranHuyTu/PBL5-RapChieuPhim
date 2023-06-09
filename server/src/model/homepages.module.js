const db = require("../common/connect");

let Movie = function (movie) {
    this.ID = movie.ID;
    this.MovieName = movie.MovieName;
    this.TimeMovie = movie.TimeMovie;
    this.TypeMovie = movie.TypeMovie;
    this.AvatarMovie = movie.AvatarMovie;
    this.TomTat = movie.TomTat;
    this.LinkReview = movie.LinkReview;
    this.GioiThieu = movie.GioiThieu;
    this.ReleaseYear = movie.ReleaseYear;
    this.Language = movie.Language;
    this.IDDirector = movie.IDDirector;
    this.IDRevew = movie.IDRevew;
    this.IDNSX = movie.IDNSX;
};

Movie.get_all_movie = function (result) {
    db.query(
        "SELECT movie.ID,movie.MovieName,movie.TimeMovie,movie.TypeMovie,movie.AvatarMovie,movie.ReleaseYear,movie.Language,movie.Like,reviews.TomTat,reviews.LinkReview,reviews.GioiThieu,movie.IDDirector,movie.IDRevew,movie.IDNSX FROM movie,reviews WHERE movie.IDRevew = reviews.ID;",
        function (err, movie) {
            if (err) {
                result(null);
            } else {
                result(movie);
            }
        },
    );
};
Movie.get_detail_movie = function (id, result) {
    db.query(
        "SELECT movie.ID,movie.MovieName,movie.TimeMovie,movie.TypeMovie,movie.AvatarMovie,movie.ReleaseYear,movie.Language,movie.Like,reviews.TomTat,reviews.LinkReview,reviews.GioiThieu,movie.IDDirector,movie.IDRevew,movie.IDNSX FROM movie,reviews WHERE movie.IDRevew = reviews.ID AND movie.ID=?;",
        id,
        function (err, movie) {
            if (err || movie.length == 0) {
                result(null);
            } else {
                result(movie);
            }
        },
    );
};

module.exports = Movie;
