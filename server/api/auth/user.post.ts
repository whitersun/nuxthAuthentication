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
    const EmailUser = await findCurrentUser(email);
    console.log('EmailUser: ', EmailUser);
    
    // TODO: check if user email exists
    // TODO: this part should be use for login or find exist user
    if (EmailUser !== null) {
        if (password !== '') {
            const passUser: any = await loginCurrentUser(email)
            const matchPassword = comparePassword(password, passUser.data.password);
            if (matchPassword) {
                // const result = getUserData(passUser.data);
        
                console.log(1);
                return {
                    status: 200,
                    msg: 'User logged in successfully',
                }
            } else {
                console.log(2);
                return {
                    status: 401,
                    msg: 'Email or password is incorrect',
                }
            }
        } else {
            return {
                status: 409,
                msg: 'Email Already Exists',
            }
        }
    } 

    // TODO: check if user email non-existed 
    // TODO: if this part in the last check findCurrent user is null
    // ?: that mean user does not exist
    // ! go a head for register
    else {

        // TODO: make sure user must have password
        if (password !== '') {

            if (fullname && username) {
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
            } else {
                return {
                    status: 401,
                    msg: 'Email or password is incorrect',
                }
            }
        }

        // ? user does not have insert password?
        // TODO: maybe user wanna login but fail?
        else {
            return {
                status: 401,
                msg: 'Email or password is incorrect',
            }
        }

    }
});