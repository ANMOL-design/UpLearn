var nodemailer = require('nodemailer');

const sendotp = async(UseremailId, username,OTP) => {
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
        subject: 'Registration OTP from UpLearn',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #77BC3F;text-decoration:none;font-weight:600">Uplearn</a>
          </div>
          <p style="font-size:1.1em">Hi ${username},</p>
          <p>Thank you for choosing Uplearn. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #77BC3F;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />Team Uplearn</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendotp