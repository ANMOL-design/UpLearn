const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  TeacherId: {
    type: String,
    required: true,
  },
  DueDate: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Board: {
    type: String,
    required: true,
  },
  ChapterName: {
    type: String,
    required: true,
  },
  ChapterNo: {
    type: Number,
    required: true,
  },
  ChapterDescription: {
    type: String,
    required: true,
  },
  iSVarified : {
    type: Boolean,
    required: true,
    default : false,
  },
  ChapterContent: [
    {
      LectureContentNo: {
        type: Number,
      },
      LectureTitle: {
        type: String,
      },
      LectureContent: {
        type: String,
      },
    },
  ],
  ChapterVideo: [
    {
      LectureContentNo: {
        type: Number,
      },
      LectureVideoTitle: {
        type: String,
      },
      LectureVideo: {
        type: String,
      },
    },
  ],
  ChapterQuiz : [{
       QuizQuestion : {
        type: String,
       },
       Options :[{
        Options : {
            type: String,
           },
       }],
       RightOption : {
        type: String,
       }
  }]
});

const Lectures = mongoose.model("LECTURES", LectureSchema);

module.exports = Lectures;