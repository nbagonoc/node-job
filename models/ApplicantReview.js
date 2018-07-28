const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const ApplicantReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("applicantReviews", ApplicantReviewSchema);
