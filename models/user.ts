import mongoose from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import { User } from "@/types/user";

export const userInfo = defineMongooseModel<User>("users", {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
});

