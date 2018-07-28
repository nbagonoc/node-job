const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanyProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  address: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  image: {
    type: String
  },
  about: {
    type: String,
    required: true
  },
  employerReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "employerReviews"
    }
  ]
});

module.exports = mongoose.model("employerprofiles", CompanyProfileSchema);
