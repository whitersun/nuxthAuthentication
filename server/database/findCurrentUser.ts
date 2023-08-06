import { userInfo } from "../../models/user";

export default async function findCurrentUser(req: string) {
    const email = req

    const user = await userInfo.findOne({ email }).select('-password');

    if (user) {
        return {
            status: 'success',
            message: "Email found successfully",
            data: user
        }
    } else {
        return {
            status: 'fail',
            message: 'Email not found.',
            data: null
        }
    }
}