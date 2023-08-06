import findAllUsers from "../../database/findAllUsers";
import findCurrentUser from "../../database/findCurrentUser";

export default defineEventHandler (async (event) => {
    const query = getQuery(event);
    
    function getUserData(user: any) {
        const { _id, __v, password, ...userData } = user.data._doc;

        return {
            id: _id,
            userData,
        };
    }


    if (query.email === undefined) {
        const users = await findAllUsers();
        console.log('users: ', users);

        // const result: any = getUserData(users);

        return {
            current: 'all',
            query: 'works',
            rec: query.email,
            data: users,
        }
    } else {
        const email: any = query.email;
        const user = await findCurrentUser(email);

        if (user.status === 'success') {
            const result: any = getUserData(user);

            return {
                status: 409,
                current: 'single',
                query: query.email,
                data: {
                    id: result.id,
                    ...result.userData,
                },
            }
        } else {
            return {
                status: 200,
                query: query.email,
                data: null
            }
        }

    }
});