const mongoose = require("mongoose");
const coursesSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  courseInstructor: {
    type: String,
    required: true,
  },
  courseThumbnail: {
    type: String,
    required: true,
  },
  courseContent: [
    {
      courseId: {
        type: String,
      },
      lectureName: {
        type: String,
      },
      LectureDescription: {
        type: String,
      },
      LecturVideos: {
        type: String,
      },
      lectureThumbnail: {
        type: String,
      },
    },
  ],

  specialization: {
    type: String,
  },
  courseRating: [
    {
      Positive: {
        type: Numbers,
      },
      Negative: {
        type: Numbers,
      },
    },
  ],
});

const Courses = mongoose.model("COURSES", coursesSchema);
module.exports = Courses;
