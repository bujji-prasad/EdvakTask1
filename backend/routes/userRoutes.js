const express = require("express");
const router = express.Router();

const { createUser , loginUser ,getUserDetails} = require("../controllers/userController");

router.post("/add", createUser);
router.post("/login" , loginUser);
router.get("/user" ,getUserDetails )

module.exports = router;
