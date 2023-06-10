module.exports = function (router) {
    const nodemailer = require("nodemailer");
    // Định nghĩa endpoint gửi email
    router.post("/send-email", (req, res) => {
        // const express = require("express");

        // const app = express();
        // const port = 3000; // Chọn cổng mà API của bạn sẽ lắng nghe

        // app.use(express.json());

        // Cấu hình thông tin email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USERNAME || "tranhuytu37cr7@gmail.com",
                pass: process.env.MAIL_PASSWORD || "04022002tu",
            },
        });

        const { to, subject, text } = req.body;

        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: to,
            subject: subject,
            text: text,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send("Failed to send email.");
            } else {
                console.log("Email sent: " + info.response);
                res.send("Email sent successfully.");
            }
        });
    });

    // Khởi động server
    // app.listen(port, () => {
    //     console.log(`Server is running on port ${port}.`);
    // });
};
