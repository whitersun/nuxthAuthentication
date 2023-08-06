import { userInfo } from "../../models/user";

export default async function findAllUsers () {
    const users = await userInfo.find({}).select('-password');;

    return users;
}