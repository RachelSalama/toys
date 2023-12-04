const express = require("express");
const { register, login, getUsers, deleteUser, updateUser } = require("../controllers/user.controllers");
const router = express.Router();


router.get("/", getUsers);

router.post("/", register);
router.post("/login", login);

// router.delete("/:id", deleteUser);

// router.patch("/", updateUser);

module.exports = router;