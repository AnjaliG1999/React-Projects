const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

router.get("/", (req, res, next) => {
  res.send("<form method='post'><button>Click</button></form>");
});

router.post("/", (req, res, next) => {
  // console.log(req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    const dbo = db.db("cakeshop");

    dbo
      .collection("users")
      .find({ email: "anjali.goyal@gmail.com" })
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);

        db.close();
      });
  });
});

module.exports = router;
