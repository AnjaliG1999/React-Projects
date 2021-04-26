const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

router.get("/", (req, res, next) => {
  res.send(
    "<form method='post'><input value='qwe@df.dsf' name='email' /><button>Click</button></form>"
  );
});

router.post("/", (req, res, next) => {
  //////// req.body undefined
  //   console.log(req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("cakeshop");
    dbo
      .collection("users")
      .find({ email: "qwe@df.dsf" })
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
});

module.exports = router;
