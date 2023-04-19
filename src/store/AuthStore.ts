import {defineStore} from "pinia";
import {AuthService} from "../service/AuthService";


export const useAuthStore =
    defineStore("AuthService", () => {
        const authService = new AuthService()
        return { authService }
    })
