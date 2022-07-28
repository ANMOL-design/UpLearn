const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Courses = require("../models/coursesSchema");

router.post("/Instructoraddcourse", (req, res) => {
  const {
    title,
    courseojective,
    level,
    language,
    Description,
    thumbnail,
    courseInstructor,
  } = req.body;

  if ( !title ||  !courseojective ||  !level ||  !language ||  !Description ||  !thumbnail ||  !courseInstructor) {
    return res.sendStatus(201);
  }

  
      const courses = new Courses({
        title,
    courseojective,
    level,
    language,
    Description,
    thumbnail,
    courseInstructor,
      });
     courses
        .save()
        .then(() => {
          res
            .status(200)
            .json({ msg: "course added Successful" });
        })
        .catch((err) => {
          console.log(err);
          res.status(501).json({ msg: "Failed to Register" });
        });
        
      
    })


module.exports = router;
