import axios from 'axios';

import { Post, User } from '../entities';

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

    public async getUser(token: string) {
        try {
            const config = this.createConfig(token);
            const response = await this.api.get<User>('/users', config);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async createUser(user: User) {
        try {
            const response = await this.api.post<User>('/users', user);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getPosts(token: string) {
        try {
            const config = this.createConfig(token);
            const response = await this.api.get<Post[]>('/posts', config);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async createPost(token: string, body: Post) {
        try {
            const config = this.createConfig(token);
            const response = await this.api.post<Post>('/posts', body, config);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async updatePost(token: string, body: Post) {
        try {
            const config = this.createConfig(token);
            const response = await this.api.put<Post>(`/posts/${body.id}`, body, config);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private createConfig(token: string) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }

}

export const snService = new SocialNetworkService();