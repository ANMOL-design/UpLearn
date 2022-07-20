const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Instructors = require("../models/instructorregisterSchema");

router.post("/InstructorRegister", (req, res) => {
  const {
    Teachername,
    email,
    password,
    cpassword,
    subject,
    Block,
    PermanentAddress,
    School,
    City,
    State,
    Pincode,
    mobileno,
    Id_Image,
    Image,
    isInstructor,
    teacher_id,
    Aadharcard,
    AadharcardImage,
  } = req.body;

  if (!Teachername || !email ||!password ||!cpassword) {
    return res.sendStatus(201);
  }

  Instructors.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.sendStatus(422);
      }
      const instructors = new Instructors({
        Teachername,
        email,
        password,
        cpassword,
        subject,
        Block,
        PermanentAddress,
        School,
        City,
        State,
        Pincode,
        mobileno,
        Id_Image,
        Image,
        isInstructor,
        teacher_id,
        Aadharcard,
        AadharcardImage,
      });
      instructors
        .save()
        .then(() => {
          res
            .status(200)
            .json({ msg: "Instructor Registration Registration Successful" });
        })
        .catch((err) => {
          res.status(501).json({ msg: "Failed to Register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
