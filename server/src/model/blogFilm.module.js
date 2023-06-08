const db = require("../common/connect");

let BlogFilm = function (blogfilm) {
    this.ID = blogfilm.ID;
    this.Title = blogfilm.Title;
    this.Content = blogfilm.Content;
    this.Image = blogfilm.Image;
    this.Type = blogfilm.Type;
};

BlogFilm.get_all = function (result) {
    db.query("SELECT * FROM blog", function (err, blog) {
        if (err) {
            result(null);
        } else {
            result(blog);
        }
    });
};

// BlogFilm.get_IDNew = function (id, result) {
//     db.query(
//         "SELECT * FROM BillAll WHERE SeatNumber=?",
//         id,
//         function (err, Bill) {
//             if (err) {
//                 result(null);
//             } else {
//                 result(Bill);
//             }
//         },
//     );
// };

BlogFilm.create = function (data, result) {
    db.query("INSERT INTO blog SET ?", data, function (err, blog) {
        if (err) {
            result(null);
        } else {
            result({ blog });
        }
    });
};
BlogFilm.remove = function (id, result) {
    db.query("DELETE FROM blog WHERE ID = ?", id, function (err, blog) {
        if (err) {
            result(null);
        } else {
            result("Xoa du lieu Bills co id " + id + " thanh cong");
        }
    });
};
BlogFilm.update = function (data, result) {
    db.query(
        "UPDATE blog SET Title = ?, Content = ?, Image=?, Type=? WHERE ID=?",
        [data.Title, data.Content, data.Image, data.Type, data.ID],
        function (err, blog) {
            if (err) {
                result(null);
            } else {
                result({ id: blog.insertID, ...blog });
            }
        },
    );
};

module.exports = BlogFilm;
