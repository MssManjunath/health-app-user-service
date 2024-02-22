import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    currentPassword: {
      type: String,
      required: true,
    },
    previousPasswords: {
      type: Array,
      required: false,
    },
    milePoints: {
      type: String,
      reqired: false,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const registerUser = mongoose.model("registerUser", userSchema);

export default registerUser;
