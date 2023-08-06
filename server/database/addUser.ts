import { userInfo } from '@/models/user'
import { userInformation } from '@/types/user';
import { userProfile } from '@/models/profile';


export default async function addUser(req: userInformation) {
    const { fullname, email, username, password } = req;


    try {
        // TODO: create a new user profile
        const newProfile = new userProfile({
            fullname: fullname,
            age: 0,
            email: email,
            username: username,
            profilePicture: '',
            dateOfBirth: '',
            address: '',
            phoneNumber: '',
            bio: '',
        });

        await newProfile.save();

        // TODO: create the user with the profile reference
        const createNewUser = new userInfo({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            profile: newProfile._id,
        });

        await createNewUser.save();

        // Exclude the password field from the result
        const formattedUser: any = await userInfo.findById(createNewUser._id)
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