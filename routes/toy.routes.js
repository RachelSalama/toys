const express = require("express");
const { Toy } = require("../models/Toys.model");
const { auth } = require("../middlewares/auth");
const { getToys, getToysByNameOrInfo ,getToysByCat,editToy, deleteToy, getToysById, postToy } = require("../controllers/toy.controllers");
const router = express.Router();


router.get("/", getToys);

router.get("/search", getToysByNameOrInfo );

router.get("/category/:catname", getToysByCat);

router.post("/", auth(), postToy);

router.patch("/:id", auth(), editToy);

router.delete("/:id", auth(), deleteToy);

router.get("/single/:id", getToysById);

module.exports = router;