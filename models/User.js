const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  // googleId, firstName and lastName is for applicant only
  googleID: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  // name is for admin/moderator/employer use only
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: "applicant"
  },
  // 1 credit = 1 job post, for employer use only
  credit: {
    type: Number
  }
});

module.exports = mongoose.model("users", UserSchema);
