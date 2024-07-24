import { API_URL } from "../config/global";

export const ProductServices = {

    getAllProducts: async () => {
        const response = await fetch(`${API_URL}/products`);
        return response.json();
    }
}