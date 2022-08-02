var nodemailer = require('nodemailer');
const puppeteer = require('puppeteer')
const sendInstructorRegistrationEmail = async(UseremailId, username) => {

 const EmailContent = "Heloo world";
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.content(EmailContent, {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  return pdf
}
const PDF = printPDF()
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
        subject: 'Hurray, You have successfully registered with UpLearn as Instructor!',
        html: `<p>Hello ${username},</p>
        <p>Welcome to UpLearn!</p>
        <img style="width: 100%; border-radius: 6px; height: 75%" src="https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg?w=2000"></img>
        <p>
         Congratulations! Your Instructor request is accepted and Now you Resgistered as a Instructor in Uplearn
        </p>
        <p>
        We're glad to have you with us!
        </p>
    
        <p>
            Regards,<br> Team UpLearn
        // </p>`,
        attachments: [
            {
                filename: 'hello',  
                path : PDF,  
                contentType: 'application/pdf'
            }]
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendInstructorRegistrationEmail