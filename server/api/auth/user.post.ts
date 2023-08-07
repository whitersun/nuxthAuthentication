import addUser from "../../database/addUser";
import findCurrentUser from "../../database/findCurrentUser";
import { comparePassword, hash } from '@/utils/password';
import loginCurrentUser from "../../database/loginUser";

export default defineEventHandler (async (event) => {
    const body = await readBody(event);

    const fullname: string = body.fullname;
    const email: string = body.email;
    const username:string = body.username;
    const password: string = body.password;
    
    const user = [];

    function getUserData (user: any) {
        const { password, ...userData } = user;
        return {
            data: userData,
        };
    }

    
    // TODO: check if user exists
    console.log(1);
    const EmailUser = await findCurrentUser(email);
    console.log(2);
    console.log('EmailUser: ', EmailUser);
    
    if (EmailUser !== null) {
        if (password !== '') {
            const passUser: any = await loginCurrentUser(email)
            const matchPassword = comparePassword(password, passUser.data.password);
            if (matchPassword) {
                // const result = getUserData(passUser.data);
        
                return {
                    status: 200,
                    msg: 'User logged in successfully',
                }
            } else {
                return {
                    status: 401,
                    msg: 'Incorrect password',
                }
            }
        } else {
            return {
                status: 409,
                msg: 'Email Already Exists',
            }
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

        const result = getUserData(user[0]);

        return {
            status: 200,
            msg: 'User created successfully',
            info: result.data.user,
        }
    }
});