const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("sign_up", function (req, res) {
  //todo
});

router.post("sign_in", function (req, res) {
  //todo
});

router.get("/labels", function (req, res) {
  //todo
});

router.post("/pictures", function (req, res) {
  //todo
});
router.get("image", function (req, res) {
  //todo
});

router.get("/labeling", function (req, res) {
  //not in our todos but this is the route to actualy get pictures to be labeled
});

module.exports = router;
