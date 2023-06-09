const db = require("../common/connect");

let Movie = function (movie) {
    this.ID = movie.ID;
    this.MovieName = movie.MovieName;
    this.IDDirector = movie.IDDirector;
    this.TimeMovie = movie.TimeMovie;
    this.ReleaseYear = movie.ReleaseYear;
    this.Language = movie.Language;
    this.TypeMovie = movie.TypeMovie;
    this.IDRevew = movie.IDRevew;
    this.IDNSX = movie.IDNSX;
    this.AvatarMovie = movie.AvatarMovie;
    this.Like = movie.Like;
};

Movie.get_all = function (result) {
    db.query("SELECT * FROM movie", function (err, movie) {
        if (err) {
            result(null);
        } else {
            result(movie);
        }
    });
};

Movie.create = function (data, result) {
    db.query("INSERT INTO movie SET ?", data, function (err, movie) {
        if (err) {
            result(null);
        } else {
            result(movie);
        }
    });
};
Movie.remove = function (id, result) {
    db.query("DELETE FROM movie WHERE id = ?", id, function (err, movie) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu Movie co id " + id + " thanh cong");
        }
    });
};
Movie.update = function (data, result) {
    db.query(
        "UPDATE movie SET MovieName=?,IDDirector=?,TimeMovie=?,ReleaseYear=?,Language=?,TypeMovie=?,IDRevew=?,IDNSX=?,AvatarMovie=?,`Like`=? WHERE ID=?",
        [
            data.MovieName,
            data.IDDirector,
            data.TimeMovie,
            data.ReleaseYear,
            data.Language,
            data.TypeMovie,
            data.IDRevew,
            data.IDNSX,
            data.AvatarMovie,
            data.Like,
            data.ID,
        ],
        function (err, movie) {
            if (err) {
                result(null);
            } else {
                result({ id: movie.insertID, ...data });
            }
        },
    );
};

module.exports = Movie;
