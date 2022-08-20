const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const LiveClass = require("../models/LiveClassSchema");
const Instructors = require("../models/instructorregisterSchema");

router.get("/myClassrooms/:Id", (req, res) => {
  const id = req.params.Id;
  LiveClass.find({ classOwner: id })
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
router.get("/myClass/:Id", (req, res) => {
  const id = req.params.Id;
  LiveClass.find({ _id: id })
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

router.post("/Add-Participant", (req, res) => {
  const { UserId, classId } = req.body;

  LiveClass.findByIdAndUpdate(
    classId,
    {
      $push: {
        classUsers: UserId,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});
router.post("/addnotesbyinstructor", (req, res) => {
  const { UserId, classId } = req.body;

  LiveClass.findByIdAndUpdate(
    classId,
    notesName,
    NotesPdf,
    {
      $push: {
        Notes: { notesName: notesName, NotesPdf: NotesPdf },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});
router.post("/addnoticebyinstructor", (req, res) => {
  const { UserId, classId } = req.body;

  LiveClass.findByIdAndUpdate(
    classId,
    NoticeTitle,
    NoticeDescription,
    {
      $push: {
        Notes: {
          NoticeTitle: NoticeTitle,
          NoticeDescription: NoticeDescription,
        },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});
router.post("/Create-room", async (req, res) => {
  const {
    classOwner,
    Subject,
    Class,
    ClassName,
    ClassDescription,
    meetingId,
    classDatePost,
  } = req.body;
  if (
    !classOwner ||
    !Subject ||
    !Class ||
    !ClassName ||
    !ClassDescription ||
    !meetingId ||
    !classDatePost
  ) {
    res.json({ msg: "filled are required to fill" });
  } else {
    const newLiveClass = new LiveClass({
      classOwner,
      Subject,
      Class,
      ClassName,
      ClassDescription,
      meetingId,
      classDatePost,
    });
    await newLiveClass.save();
    const InstructorClassroms = await Instructors.findById(classOwner);
    await InstructorClassroms.MyClassrooms.push(newLiveClass);
    await InstructorClassroms.save();
    res.sendStatus(200);
  }
});
module.exports = router;
