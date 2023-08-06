import mongoose, { Document } from 'mongoose'

export interface UserProfile extends Document {
    fullname: string;
    age: number;
    email: string;
    username: string;
    password: string;
    profilePicture: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    bio: string;
}

export interface User extends Document {
    fullname: string;
    email: string;
    username: string;
    password: string;
}

export interface userInformation {
    fullname: string;
    email: string;
    username: string;
    password: string;
}

export interface userProfile extends Document {
    profile: mongoose.Types.ObjectId;
    // Other fields related to the user
    // For example: authentication details
}

export interface User extends Document {
    profile: mongoose.Types.ObjectId;
}

