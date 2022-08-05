const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Courses = require("../models/coursesSchema");
const Instructors = require("../models/instructorregisterSchema");

router.post("/Instructoraddcourse", (req, res) => {
  const {
    title,
    courseojective,
    level,
    language,
    Description,
    thumbnail,
    courseInstructor,
    courseCategory
  } = req.body;

  if ( !title ||  !courseojective ||  !level ||  !language ||  !Description ||  !thumbnail ||!courseCategory||  !courseInstructor) {
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
    courseCategory
      });
     courses
        .save()
        .then(async () => {
          Instructors.findByIdAndUpdate(courseInstructor,{$push:{CousesList:{nameOfCourse:courses.title,courseId:courses._id}}},
            function(err, result){
       
             if(err){
                 console.log(err);
             }
             else{
               console.log(result);
                }
              })
              res
              .status(200)
              .json({ msg: "course added Successful" });
         
         
        })
        .catch((err) => {
          console.log(err);
          res.status(501).json({ msg: "Failed to Register" });
        });
        
})

router.get('/CoursesUplearn', (req, res) => {
      Courses.find({}).then((result) => {
          res.send(result)
      });
  })
  
module.exports = router;
