const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  dob: {
    type: Date
  },
  location: {
    type: String
  },
  expense: [
    {
      description: {
        type: String,
        required: true
      },
      money: {
        type: Number
      },
      date: {
        type: Date,
        required: true
      },
      month: {
        type: Date
      }
    }
  ],

  gain: [
    {
      description: {
        type: String,
        required: true
      },
      money: {
        type: String
      },
      date: {
        type: Date,
        required: true
      },
      month: {
        type: Date
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
