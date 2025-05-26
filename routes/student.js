const express = require("express");
const router = express.Router();

// /api/student route
router.get("/", (req, res) => {
    res.json({
        fullName: "My Chi Nguyen",
        studentID: "225255856",
    });
});

module.exports = router;