import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String },
    occupation: { type: String },
    about: { type: String },
    github: { type: String },
    linkedIn: { type: String },
    twitter: { type: String },

    workExperience: {
        type: [
            {
                heading: { type: String, required: true }, // Work Experience Title
                coverImage: { type: String, required: true } // Image URL
            }
        ],
        validate: {
            validator: function (value) {
                return value.length >= 1 && value.length <= 4; // Allow only 1 to 4 entries
            },
            message: "You can add between 1 to 4 work experiences."
        }
    },
    projects: {
        type: [
            {
                heading: { type: String, required: true }, // Work Experience Title
                title: { type: String, required: true } // Image URL
            }
        ],
        validate: {
            validator: function (value) {
                return value.length >= 1 && value.length <= 4; // Allow only 1 to 4 entries
            },
            message: "You can add between 1 to 4 work experiences."
        }
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
