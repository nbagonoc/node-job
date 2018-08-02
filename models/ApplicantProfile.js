const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicantProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  image: {
    type: String
  },
  contact: {
    type: Number
  },
  address: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "skills"
    }
  ],
  educations: [
    {
      type: Schema.Types.ObjectId,
      ref: "educations"
    }
  ],
  experiences: [
    {
      type: Schema.Types.ObjectId,
      ref: "experiences"
    }
  ],
  applicantReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "applicantReviews"
    }
  ]
});

module.exports = mongoose.model("applicantProfiles", ApplicantProfileSchema);
