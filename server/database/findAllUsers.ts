import { userProfile } from "@/models/profile";

export default async function findAllUsers () {
    const users = await userProfile.find({});

    return users;
}