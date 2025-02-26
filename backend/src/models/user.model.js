import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true, trim: true, index: true },
    occupation: { type: String, required: true },
    about: { type: String, required: true },
    github: { type: String, required: true },
    linkedIn: { type: String, required: true },
    twitter: { type: String, required: true },

    workExperience: {
      type: [
        {
          heading: { type: String, required: true }, // Work Experience Title
          coverImage: { type: String, required: true }, // Image URL
        },
      ],
      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 4; // Allow only 1 to 4 entries
        },
        message: "You can add between 1 to 4 work experiences.",
      },
    },
    projects: {
      type: [
        {
          heading: { type: String, required: true }, // Work Experience Title
          title: { type: String, required: true }, // Image URL
        },
      ],
      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 4; // Allow only 1 to 4 entries
        },
        message: "You can add between 1 to 4 work experiences.",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
      if (!this.isModified("password")) return next();

      this.password = await bcrypt.hash(this.password, 10);
      next();
  } catch (error) {
      next(error); // Passes the error to Mongoose, stopping execution
  }
});

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

const User = mongoose.model("User", userSchema);
export default User;
