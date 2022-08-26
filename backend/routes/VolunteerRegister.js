const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Volunteer = require("../models/VolunteerSchema");

router.post("/VolunteerRegister", (req, res) => {
  const {
    Volunteername,
    Volunteeremail,
    block,
    ViLL_city,
    District,
    State,
    pincode,
    mobileno,
    idImage,
    image,
    aadharCard,
    AadharcardImage,
  } = req.body;

  console.log(req.body);
  function generateVolunteerId() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  let Govt_assign_id =generateVolunteerId();
  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const password = generatePassword();

  Volunteer.findOne({ Volunteeremail: Volunteeremail })
    .then((existingUser) => {
      if (existingUser) {
        return res.sendStatus(422);
      }
      const VOLUNTEERS = new Volunteer({
        Volunteername,
        Volunteeremail,
        block,
        ViLL_city,
        District,
        State,
        pincode,
        password,
        mobileno,
        idImage,
        image,
        Govt_assign_id,
        aadharCard,
        AadharcardImage,});
      VOLUNTEERS
        .save()
        .then(() => {

          res
            .status(200)
            .json({ msg: "Volunteer Registration Successful" });
        })
        .catch((err) => {
          console.log(err);
          res.status(501).json({ msg: "Failed to Register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allVolunteer", (req, res) => {
  Volunteers.find({}).then((result) => {
    res.send(result);
  });
});

// router.post("/InstructorRemoved", (req, res) => {
//   const { id } = req.body;
//   Instructors.findByIdAndDelete(id, function (err, docs) {
//     if (err) {
//       console.log("Error occured" + err);
//     } else {
//       res.status(200).json({ msg: "deleted" });
//       console.log("Deleted : " + docs);
//     }
//   });
// });

// //Change The Password
// router.post("/setnewinstructorpassword", (req, res) => {
//   const { _id, npassword, cpassword } = req.body;

//   Instructors.findOne({ _id: _id })
//     .then((user) => {
//       if (!user) {
//         return res.status(422).json({ error: "User don't exists" });
//       }
//       user.password = npassword;
//       user.cpassword = cpassword;
//       user.save().then(() => {
//         res.json({ message: "password updated success" });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Finding one instructor by its id
// router.get("/instructordetails/:id", (req, res) => {
//   const id = req.params.id;

//   Instructors.findOne({ _id: id })
//     .then((product) => {
//       if (product) {
//         return res.send(product);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(404);
//     });
// });

module.exports = router;
