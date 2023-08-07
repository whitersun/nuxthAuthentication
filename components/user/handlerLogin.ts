import { object, string } from 'yup';

type User = {
    email: string | undefined,
    password: string | undefined,
    remember: boolean | undefined,
}

type Error = {
    email: string | undefined,
    password: string | undefined,
}

export const loginTypes = () => {
    const form = ref();
    const openModal = ref(false);
    const loginSuccess = ref(false);

    const state = ref<User>({
        email: '',
        password: '',
        remember: false,
    });

    const error = ref<Error>({
        email: undefined,
        password: undefined,
    })

    return {
        state,
        form,
        error,
        openModal,
        loginSuccess,
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

export const formValidate = () => {
    const schema = object({
        email: string().required('Required'),
        password: string().required('Required'),
    });

    return {
        schema,
    }
}

export const logInHandler = async (form: Ref<any>) => {
    // TODO: Handle error first
    const formInfo = await form.value!.validate();

    // TODO: Declare error ref
    const { error, loginSuccess } = loginTypes();

    // TODO: Declare schema
    const { schema } = formValidate();

    const { email, password, remember } = formInfo;

    const { data } = useFetch('/api/auth/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            remember: remember
        })
    })

    const info: any = toRaw(data.value);
    console.log('info: ', info);

    if (info.status === 200) {
        loginSuccess.value = true;
        return {
            status: 200,
            login: toRaw(loginSuccess.value)
        };
    } else if (info.status === 401) {
        error.value.email = 'Email not found';
        error.value.password = 'Password not found';

        return {
            status: 401,
            login: toRaw(error.value)
        };
    }
}