import { userInfo } from '../../models/user'
import { userInformation } from '../types/user';


export default async function addUser(req: userInformation) {
    const { fullname, email, username, password } = req

    try {
        const createNewUser = await userInfo.create({
            fullname,
            email,
            username,
            password
        })
        
        // Exclude the password field from the result
        const formattedUser = await userInfo.findById(createNewUser._id)
            .select('-password -__v').lean().exec();

        const user = { ...formattedUser, id: formattedUser._id };
        delete user._id;

        return {
            user,
            status: 'success',
        }

    } catch (error: any) {
        return {
            status: 'fail',
            error: error.message
        }
    }
}