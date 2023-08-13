import { userInfo } from "@/models/user";

export default async function loginCurrentUser(req: string) {
    const email = req

    const user = await userInfo.findOne({ email })

    if (user) return { data: user }
    else return { data: null }
}