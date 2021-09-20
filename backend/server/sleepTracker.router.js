const express = require("express");

const UserRecords = require("./models");

const router = express.Router();

router.get("/", (_req, res) => {
  UserRecords.find()
    .lean()
    .exec((err, userRecords) => {
      if (err) {
        res.status(500).send(error.message);
      } else res.send(userRecords);
    });
});

router.post("/", async (req, res) => {
  const sleepRecord = req.body;
  try {
    const newSleepRecord = await UserRecords.create(sleepRecord);
    res.send(newSleepRecord);
  } catch (err) {
    res
      .status(err.message.includes("validation") ? 400 : 500)
      .send(err.message);
  }
});

router.put("/sleep-time", async (req, res) => {
  const data = req.body;
  const userRecords = await UserRecords.findById(data._id);

  userRecords.sleepRecords.push(...data.sleepRecords);

  userRecords.save(function (err) {
    if (err)
      res
        .status(err.message.includes("validation") ? 400 : 500)
        .send(err.message);
    else res.send(userRecords);
    console.log("Success!");
  });
});

module.exports = router;
