const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Lectures = require("../models/LectureSchema");

router.post("/AssignTaskToInstructor", (req, res) => {
    const {
        TeacherId,
        Subject,
        Class,
        DueDate,
        Board,
        ChapterName,
        ChapterNo,
        ChapterDescription,
    } = req.body;

    // console.log(req.body);


    const lectures = new Lectures({
        TeacherId,
        Subject,
        Class,
        DueDate,
        Board,
        ChapterName,
        ChapterNo,
        ChapterDescription,
    });
    lectures
        .save()
        .then(() => {
            res.status(200);
            res.json({ msg: "Instructor Registration Registration Successful" });
        })
        .catch((err) => {
            console.log(err);
            res.status(501).json({ msg: "Failed to Register" });
        });

});

router.get("/assigntaskdetails/:id", (req, res) => {
    const id = req.params.id;
    // console.log(id)
    Lectures.find({ TeacherId: id, iSVarified: false }).then((product) => {
        if (product) {
            // console.log(product)
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })

})

module.exports = router;