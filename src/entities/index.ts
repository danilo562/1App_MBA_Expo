export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface Post {
    id?: number;
    createdAt?: Date;
    image?: string;
    description: string;
    location?: string;
    owner: User;
}