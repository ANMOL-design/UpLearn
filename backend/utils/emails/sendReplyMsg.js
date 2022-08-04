var nodemailer = require('nodemailer');

const sendReplymsg = async (UseremailId, username, subject, body) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'uplearnforsih@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'uplearnforsih@gmail.com',
        to: UseremailId,
        subject: subject,
        text: username + " " + body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendReplymsg