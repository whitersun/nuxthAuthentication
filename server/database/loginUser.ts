import { userInfo } from "@/models/user";

export default async function loginCurrentUser(req: string) {
    const email = req

    const user = await userInfo.findOne({ email })

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