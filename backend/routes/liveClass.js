const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const LiveClass = require("../models/LiveClassSchema")
const Instructors = require("../models/instructorregisterSchema");
const User = require("../models/userSchema");
const AddtoClassEmail = require("../utils/emails/AddToClassEmail");
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
    LiveClass.find({_id : id })
    .then((product) => {
        if (product) {
          return res.send(product);
        }
      })
      .catch((err) => {
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

  router.post("/Add-Participant",async (req, res) => {
    const { UserId,classId,InstructorId} = req.body;
   const getUser = await User.findById(UserId)
   const getClass = await LiveClass.findById(classId)
   const getInstructor= await Instructors.findById(InstructorId)
    LiveClass.findByIdAndUpdate(
        classId,
      {
        $push: {
            classUsers: UserId
        }
      }
    ).then(()=>{
      User.findByIdAndUpdate(
        UserId,
      {
        $push: {
            MyClassrooms: classId
        },
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          AddtoClassEmail(getUser.name,getUser.email,getClass.ClassName,getClass.ClassDescription,getInstructor.Teachername,getClass.Subject,getClass.Class)
          res.status(200).json({ msg: "User added Successful" });
        }
      }
    )
    }).catch((error)=>{
      console.log(error);
    })
  });
  router.post("/removefromclass", (req, res) => {
    const { UserId ,ClassId} = req.body;
    LiveClass.findByIdAndUpdate(
        ClassId,
      {
        $pull: {
            classUsers: UserId
        },
      }
    ).then(()=>{
      User.findByIdAndUpdate(
        UserId,
      {
        $pull: {
            MyClassrooms: ClassId
        },
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ msg: "User Removed Successful" });
        }
      }
    )
    }).catch((error)=>{
      console.log(error);
    })
  });
z
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
