//@ts-nocheck
import httpService from '@/services/http.service';
import errorHandler from '@/shared/lib/errorHandler';

export const authService = {
    signUp: async (payload) => {
        try {
            return await httpService.post('signUp', { payload });
        } catch (e) {
            console.log("authService__signUp", e);
            errorHandler(e);
        }
    },
    confirm: async (payload) => {
        try {
            return await httpService.post('confirmRegistration', { payload });
        } catch (e) {
            console.log("authService__confirm", e);
            errorHandler(e);
        }
    },
    login: async (payload) => {
        try {
            console.log('payload', payload);
            return await httpService.post("login", {payload});
        } catch (e) {
            console.log("authService__login", e);
            errorHandler(e);
        }
    },
    validateAccess: async () => {
        try {
           return await httpService.get("validateAccess");
        } catch (e) {
            console.log("authService__validateAccess", e);
            errorHandler(e);
        }
    }
};
