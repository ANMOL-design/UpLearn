const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);

const PostData = require("../models/postCareerDetailSchema");

router.get("/admin/getAllCareer/:subcategory", (req, res) => {
    const subcategory = req.params.subcategory;

    PostData.find({ subcategory: subcategory }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(data);
        }
    });
})

router.get("/admin/getCareerbyId/:id", (req, res) => {
    const id = req.params.id;
    PostData.findById(id, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(data);
        }
    });
})
router.post("/admin/postCareerDetails", (req, res) => {
    try {
        const { title, description, category, subcategory } = req.body;
        console.log(req.body);
        if (!title || !description || !category) {
            res.json({ msg: "filled are required to fill" });
        } else {
            const newContactData = new PostData({
                title,
                description,
                category,
                subcategory
            });
            newContactData
                .save()
                .then(() => {
                    res.status(201).json({ msg: "data added succesfuly" });
                })
                .catch((err) => {
                    res.json({ msg: "data not added error occured" });
                });
        }
    } catch (error) {
        console.log("error occcured " + error);
    }
});
module.exports = router;
