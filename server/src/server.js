var express = require("express");
var app = express();

var bodyParser = require("body-parser");
const _AuthMiddleware = require("./common/_AuthMiddleWare");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type",
    );
    next();
});

require("./route/login")(app);
require("./route/uploadimage")(app);
require("./route/PaymentRouter")(app);
require("./route/home")(app);
require("./route/blogMovie")(app);
require("./route/blogFilm")(app);
require("./route/actors")(app);
require("./route/directors")(app);
require("./route/cinema")(app);
require("./route/promotions")(app);
require("./route/showtime")(app);
require("./route/listactor")(app);
require("./route/review")(app);
require("./route/movie")(app);
app.use(_AuthMiddleware.isAuth);
require("./route/nsx")(app);
require("./route/prices")(app);
require("./route/foods")(app);
require("./route/halls")(app);
require("./route/booded_tickets")(app);
require("./route/boodedfoods")(app);
require("./route/bill")(app);
require("./route/seat")(app);
require("./route/account")(app);
require("./route/history")(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Backend Node Js Runing the port : " + port);
});
