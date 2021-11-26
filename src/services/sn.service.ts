import axios from 'axios';

import { User } from '../entities';

class SocialNetworkService {

    private readonly api = axios.create({
        baseURL: 'https://social-network-for-class.herokuapp.com'
    });

    public async login(email: string, password: string): Promise<string | null> {
        try {
            const response = await this.api.post('/auth/login', { email, password });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getPosts(token: string){
        try {
            //Bearer
            const response = await this.api.get('/posts',
             {headers:{ Authorization: `Bearer ${token}` } });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async create(user: User) {
        try {
            const response = await this.api.post('/users', user);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}

export const snService = new SocialNetworkService();