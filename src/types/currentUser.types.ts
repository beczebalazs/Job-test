export interface ICurrentUserResponse {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    role: string;
}

export interface ICurrentUser {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    role: string;
}

export interface IUpdateCurrentUserRequest {
    email?: string;
    password?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    age?: number;
    role?: string;
}

export interface IUpdateCurrentUserResponse {
    _id: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    role: string;
    id: string;
}
