const express = require('express');
const router = express.Router();
router.use(express.json());
const Authentication = require('../middleware/Authentication');
const AuthenticationAdmin = require('../middleware/AuthenticationiAdmin');

router.get('/aboutStudents', Authentication, (req, res) => {
    res.send(req.rootUser);
});

router.get('/aboutAdminActive', AuthenticationAdmin, (req, res) => {
    res.send(req.rootUser);
});


module.exports = router;