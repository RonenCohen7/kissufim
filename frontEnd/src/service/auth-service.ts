import axios from "axios";
import {  type LoginData, type LoginResponse, type RegisterData, type userModel } from "../models/user-model";

import { appConfig } from "../utils/app-config";



class AuthService {

    //Register
    public async register(user:RegisterData):Promise<userModel>{

        const response = await axios.post<userModel>(
            `${appConfig.authUrl}/register`, user
        )

        return response.data;
    }


    //Login
    public async login(credentials: LoginData):Promise<string>{
        const response = await axios.post<LoginResponse>(
            `${appConfig.authUrl}/login`,credentials
        );

        return response.data.token;
    }


    //Get Current user
    public async getCurrentUser(token: string):Promise<userModel>{

        const response = await axios.get<userModel>(
            `${appConfig.authUrl}/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }
}


export const authService = new AuthService();