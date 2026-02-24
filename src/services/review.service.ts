//@ts-nocheck
import httpService from '@/services/http.service';
import errorHandler from '@/shared/lib/errorHandler';

export const reviewService = {
    submitReview: async (payload) => {
        try {
            console.log('reviewService__submitReview payload:', payload);
            return await httpService.post('review', { payload });
        } catch (e) {
            console.log('reviewService__submitReview', e);
            errorHandler(e);
        }
    },

    // Отримання списку відгуків (для адмінки або публічної сторінки)
    getReviews: async (params = {}) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `reviews?${queryString}` : 'reviews';
            return await httpService.get(url);
        } catch (e) {
            console.log('reviewService__getReviews', e);
            errorHandler(e);
        }
    },

    // Отримання відгуку за ID
    getReviewById: async (id) => {
        try {
            return await httpService.get(`review/${id}`);
        } catch (e) {
            console.log('reviewService__getReviewById', e);
            errorHandler(e);
        }
    },

    // Оновлення статусу відгуку (для адмінки)
    updateReviewStatus: async (id, status) => {
        try {
            return await httpService.patch(`review/${id}/status`, {
                payload: { status },
            });
        } catch (e) {
            console.log('reviewService__updateReviewStatus', e);
            errorHandler(e);
        }
    },

    // Видалення відгуку (для адмінки)
    deleteReview: async (id) => {
        try {
            return await httpService.delete(`review/${id}`);
        } catch (e) {
            console.log('reviewService__deleteReview', e);
            errorHandler(e);
        }
    },

    // Отримання тільки схвалених відгуків (для публічної сторінки)
    getApprovedReviews: async (page = 1, limit = 10) => {
        try {
            return await httpService.get(
                `reviews?status=approved&page=${page}&limit=${limit}`
            );
        } catch (e) {
            console.log('reviewService__getApprovedReviews', e);
            errorHandler(e);
        }
    },

    // Отримання статистики відгуків (для адмінки)
    getReviewsStats: async () => {
        try {
            return await httpService.get('reviews/stats');
        } catch (e) {
            console.log('reviewService__getReviewsStats', e);
            errorHandler(e);
        }
    },
};
