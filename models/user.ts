import { defineMongooseModel } from "#nuxt/mongoose";
import { User } from "types/user";

export const userInfo = defineMongooseModel<User>("User", {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

