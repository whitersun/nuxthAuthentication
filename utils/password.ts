import bcrypt from 'bcryptjs';

export const hash = (password: string) => bcrypt.hashSync(password, 10);
export const comparePassword = (password: string, hashedPassword: string) => bcrypt.compareSync(password, hashedPassword);

export const generateRandomPassword = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let password = '';

    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return password;
}