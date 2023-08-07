import { userProfile } from "@/models/profile";

export default async function findCurrentUser(req: string) {
    const email = req
    const user = await userProfile.findOne({ email })
    console.log('Find user: ', user);

    if (user) return user
    else return null
}