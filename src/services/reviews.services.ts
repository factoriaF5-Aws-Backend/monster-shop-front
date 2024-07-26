import { API_URL } from "../config/global";


export const reviewsServices = {    
    async getReviews(productId: string) {
        const response = await fetch(`${API_URL}/reviews?productId=${productId}`);
        return response.json();
    },
    async addReview(review: any) {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });
        return response.json();
    }
}