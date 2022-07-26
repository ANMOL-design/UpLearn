const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bycrypt = require('bcrypt')
router.use(express.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());
const User = require("../models/userSchema");
const Instructor = require("../models/instructorregisterSchema");


router.post("/updateUserProfile", (req, res) => {
    const {
        _id,
        firstName,
        LastName,
        classes,
        Board,
        PermanentAddress,
        School,
        City,
        State,
        Pincode,
        mobileno,
        Image,
        Gender,
        DOB,
        BIO
    } = req.body;

    console.log(_id);

    User.findByIdAndUpdate(_id, {
            name: firstName + ' ' + LastName,
            firstName: firstName,
            LastName: LastName,
            class: classes,
            Board: Board,
            PermanentAddress: PermanentAddress,
            School: School,
            City: City,
            State: State,
            Pincode: Pincode,
            mobileno: mobileno,
            Image: Image,
            Gender: Gender,
            DOB: DOB,
            BIO: BIO
        },
        function(err, docs) {
            if (err) {
                console.log("error occured" + err)
            } else {
                res.status(200).json({ msg: "Updated" })
                console.log("Updated Profile : " + docs);
            }
        })
})

module.exports = router;