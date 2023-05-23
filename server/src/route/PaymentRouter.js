module.exports = function (router) {
    router.get("/api/paypal/config", (req, res) => {
        return res.status(200).json({
            status: "OK",
            data:
                process.env.PORT ||
                "AeREe9ZzALtgXnDfzteytmnIT982EA-M-rtQj0SsTw7WzWUXsOg7-tsCwLd3OOz_RgDwofjAUq1vabaR",
        });
    });
};
