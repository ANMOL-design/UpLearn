var nodemailer = require('nodemailer');
const puppeteer = require('puppeteer')

const sendInstructorRegistrationEmail = async(UseremailId, username,Id,Image,password) => {

 const EmailContent = `<style>
 .user-row {
    margin-bottom: 14px;
  }
  
  .table-user-information > tbody > tr {
    border-top: 1px solid #ccc;
  }
  
  .table-user-information > tbody > tr:first-child {
    border-top: 0;
  }
  
  .table-user-information > tbody > tr > td {
    border-top: 0;
  }
  
  .panel {
    margin-top: 20px;
  }
 </style>

 <div class="container">
 <div class="row">
   <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
     <div class="panel panel-primary">
       <div class="panel-heading">
         <h3 class="panel-title">${username}</h3>
       </div>
       <div class="panel-body">
         <div class="row">
           <div class="col-md-3 col-lg-3 " align="left"> <img alt="User Pic" style="width:100px; height:80px" src=${Image} class="img-circle img-responsive"> </div>
           <div class=" col-md-9 col-lg-9 ">
             <table class="table table-user-information">
               <tbody>
                 <tr style="border-top: 1px solid #ccc;">
                   <td>Department:</td>
                   <td>Instructor</td>
                 </tr>
                 <tr style="border-top: 1px solid #ccc;">
                   <td>ID </td>
                   <td>${Id}</td>
                 </tr>
                   <tr style="border-top: 1px solid #ccc;">
                     <td>Email</td>
                     <td>${UseremailId}</td>
                   </tr>
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>`;
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(EmailContent, {waitUntil: ['networkidle0','domcontentloaded','load']});
  const pdf = await page.pdf({ format: 'A4' ,printBackground:true});
   
  await browser.close();
  return pdf
}
printPDF().then(async (Pdf)=>{
   
    
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

            <p>
             Congratulations! Your Instructor request is accepted and Now you Resgistered as a Instructor in Uplearn
            </p>
            <p>
             <strong>your Login Credentials :</strong>
             <p>User Id : ${UseremailId}</p>
             <p>Password : ${password} </p>
             <p><i style="color :red">Note : This is Your login Credentials Please Do not Disclose to anyone or Change password </i></p>
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
                    content : Pdf,  
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
    }).catch((err)=>{
        console.log(err);
    })
   
    
     

    
}
module.exports = sendInstructorRegistrationEmail