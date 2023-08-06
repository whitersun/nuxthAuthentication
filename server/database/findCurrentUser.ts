import { userProfile } from "@/models/profile";

export default async function findCurrentUser(req: string) {
    const email = req

    const user = await userProfile.findOne({ email })

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