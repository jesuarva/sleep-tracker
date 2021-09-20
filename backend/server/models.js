const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserRecords = new Schema({
  name: {
    type: String,
    required: [true, "User name required."],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female"],
  },
  sleepRecords: [
    {
      time: {
        type: Number,
        required: [true, "Sleep Time is required"],
        min: 0,
        max: 24,
      },
      date: {
        type: Date,
        required: [true, "Date is required"],
      },
    },
  ],
});

module.exports = mongoose.model("UserRecords", UserRecords);
