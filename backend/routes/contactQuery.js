const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const contactemail = require("../utils/emails/contactemail")
const ContactData = require("../models/contactJSchema");

router.post("/contactus", (req, res) => {
  try {
    const { name, email, phoneNo, message } = req.body;
    if (!name || !email || !phoneNo || !message) {
      res.json({ msg: "filled are required to fill" });
    } else {
        let today  = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yy =today.getFullYear();
        let hh = today.getHours();
        let mi = today.getMinutes();
        let ss = today.getSeconds();
        let time = dd+"/"+mm+"/"+yy+"("+hh+":"+mi+":"+ss+")";
       const queryId =  Math.floor(Math.random() * (999999 - 100000)) + 100000;
      const newContactData = new ContactData({
        name,
        email,
        phoneNo,
        message,
        queryId,
        time
      });
      newContactData
        .save()
        .then(() => {
          res.status(201).json({ msg: "data added succesfuly" });
          contactemail(newContactData.email,newContactData.name,newContactData.queryId)
        })
        .catch((err) => {
          res.json({ msg: "data not added error occured"});
        });
    }
  } catch (error) {
    console.log("error occcured " + error);
  }
});
module.exports = router;
