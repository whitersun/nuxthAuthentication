import { defineMongooseModel } from "#nuxt/mongoose";
import { UserProfile } from "types/user";

export const userProfile = defineMongooseModel<UserProfile>("profiles", {
    fullname: { type: String, required: true },
    age: { type: Number, required: false },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    profilePicture: String,
    dateOfBirth: Date,
    address: String,
    phoneNumber: String,
    bio: String,
});

