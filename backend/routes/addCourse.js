const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Courses = require("../models/coursesSchema");
const Instructors = require("../models/instructorregisterSchema");
const User = require("../models/userSchema");

router.post("/Instructoraddcourse", (req, res) => {
  const {
    title,
    courseojective,
    level,
    language,
    Description,
    thumbnail,
    courseInstructor,
    courseCategory,
  } = req.body;

  if (
    !title ||
    !courseojective ||
    !level ||
    !language ||
    !Description ||
    !thumbnail ||
    !courseCategory ||
    !courseInstructor
  ) {
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
    courseCategory,
  });
  courses
    .save()
    .then(async () => {
      Instructors.findByIdAndUpdate(
        courseInstructor,
        {
          $push: {
            CousesList: { nameOfCourse: courses.title, courseId: courses._id },
          },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
      res.status(200).json({ msg: "course added Successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ msg: "Failed to Register" });
    });
});

router.get("/coursesUplearn/:id", (req, res) => {
  const id = req.params.id;
  Courses.find({ courseInstructor: id })
    .then((product) => {
      if (product) {
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.get("/Instructorcourse/:id", (req, res) => {
  const id = req.params.id;
  Courses.find({ _id: id })
    .then((product) => {
      if (product) {
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.post("/addVideoToCourse", (req, res) => {
  const { VideoLecture, VideoContentTitle, Id } = req.body;
  console.log(req.body);
  Courses.findByIdAndUpdate(
    Id,
    {
      $push: {
        courseVideoContent: {
          VideoLecture: VideoLecture,
          VideoContentTitle: VideoContentTitle,
        },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});
router.post("/addArticleToCourse", (req, res) => {
  const { ArticleTitle, ArticleContent, Id } = req.body;
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yy = today.getFullYear();
  let hh = today.getHours();
  let mi = today.getMinutes();
  let ss = today.getSeconds();
  let time = dd + "/" + mm + "/" + yy + "(" + hh + ":" + mi + ":" + ss + ")";
  Courses.findByIdAndUpdate(
    Id,
    {
      $push: {
        courseArticles: {
          ArticleTitle: ArticleTitle,
          ArticleContent: ArticleContent,
          time: time,
        },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

router.post("/EnrolledCourse", (req, res) => {
  const { userId, CourseId, nameOfCourse } = req.body;

  User.findByIdAndUpdate(
    userId,
    {
      $push: {
        CousesEnrolled: { nameOfCourse: nameOfCourse, CourseId: CourseId },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

router.post("/CourseRating", (req, res) => {
  const { courseId, UserId, rating, review } = req.body;
  Courses.findByIdAndUpdate(
    courseId,
    { $push: { Rating: { rateBy: UserId, rating: rating, review: review } } },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

module.exports = router;
