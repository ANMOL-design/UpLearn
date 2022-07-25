const express = require('express');
const router = express.Router();
router.use(express.json());
const Authentication = require('../middleware/Authentication')

router.get('/aboutStudents', Authentication, (req, res) => {
    res.send(req.rootUser);
});


module.exports = router;