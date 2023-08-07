import { object, string } from 'yup';

type User = {
    fullname: string | undefined,
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
}

type Error = {
    email: string | undefined
}

export const registerTypes = () => {
    const registerSuccess = ref(false);

    const form = ref();

    const state = ref<User>({
        fullname: undefined,
        username: undefined,
        email: undefined,
        password: undefined
    });

    const error = ref<Error>({
        email: undefined,
    })

    return {
        state,
        form,
        error,
        registerSuccess,
    }
};

export const formValidate = () => {
    const schema = object({
        fullname: string().required('Required'),
        username: string().required('Required'),
        email: string()
            .email("Invalid email")
            .required('Required').test(
                'email-in-use',
                'Email is already in use',
                async function (value) {
                    if (value) {
                        const { data } = await useFetch('/api/auth/user?email=' + value);
                        
                        const info: any = toRaw(data.value);
                        console.log(info);

                        return info.status === 409 ? false : true;
                    } else {
                        return false
                    }
                }
            ),
        password: string().min(6, 'Must be at least 8 characters').required('Required'),
    });

    return {
        schema,
    }
}

export const showHidePassword = (password: Ref<any>, show: Ref<Boolean>) => {
    show.value = !show.value;

    show.value ? password.value?.input.setAttribute('type', 'text')
        : password.value?.input.setAttribute('type', 'password');

    return {
        show,
        password
    }
}

export const signUpHandler = async (form: Ref<any>) => {
    // TODO: Handle error first
    const formInfo = await form.value!.validate();

    // TODO: Declare error ref
    const { error, registerSuccess } = registerTypes();

    // TODO: Declare schema
    const { schema } = formValidate();

    const { fullname, username, email, password } = formInfo;

    const userInsert = { 
        fullname: fullname,
        username: username,
        email: email,
        password: password,
    };

    const { data } = await useFetch('/api/auth/user', {
        method: 'POST',
        body: JSON.stringify(userInsert)
    });

    const info: any = toRaw(data.value);
    console.log('info: ', info.status);

    if (info.status === 200) {
        registerSuccess.value = true;
        return {
            register: 'success',
            message: 'Register success',
            modal: registerSuccess.value
        };
    }

    if (info.status === 409) {
        error.value.email = info.msg;
        return {
            register: 'fail',
            message: 'Email is already in use',
            modal: registerSuccess.value
        };
    }

    switch(info.status) {
        case 200: {
            console.log(info);

            registerSuccess.value = true;
            console.log('registerSuccess.value: ', registerSuccess.value);
            return registerSuccess.value;
        }

        case 409: {
            console.log(info);
            console.log(schema);
            error.value.email = info.msg;
        }
    }
}

export const loginWithFacebook = () => {}