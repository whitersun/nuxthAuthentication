import addUser from "../../database/addUser";
import findCurrentUser from "../../database/findCurrentUser";
import { hash } from '@/utils/password';

export default defineEventHandler (async (event) => {
    const body = await readBody(event);

    const fullname: string = body.fullname;
    const email: string = body.email;
    const username:string = body.username;
    const password: string = body.password;

    const user = [];

    // TODO: check if user exists
    const haveUser = await findCurrentUser(email);

    if (haveUser.data !== null) {
        return {
            status: 409,
            msg: 'Email Already Exists',
        }
    } else {
        const hashedPassword: string = hash(password);

        const information = {
            fullname: fullname,
            email: email,
            username: username,
            password: hashedPassword
        }

        const newUser = await addUser(information);
        user.push(newUser);

        function getUserData (user: any) {
            const { password, ...userData } = user;
            return {
                data: userData,
            };
        }

        const result = getUserData(user[0]);
        console.log('result: ', result);

        return {
            status: 200,
            msg: 'User created successfully',
            info: result.data.user,
        }
    }
});