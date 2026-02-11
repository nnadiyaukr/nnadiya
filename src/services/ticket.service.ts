//@ts-nocheck
import httpService from '@/services/http.service';
import errorHandler from '@/shared/lib/errorHandler';

export const ticketService = {
    invite: async (payload) => {
        try {
            return await httpService.post('invite', { payload });
        } catch (e) {
            console.log('ticketService__invite', e);
            errorHandler(e);
        }
    },
};
