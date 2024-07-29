import axios from "axios";
import { API_URL } from "../config/global";

export const ProductServices = {

    getAllProducts: async () => {
        const response = await fetch(`${API_URL}/products`);
        return response.json();
    },

    deleteProduct: async (id: number) => {
        await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
        });
        return;
    },

    uploadProduct: async (product: FormData) => {
        product.append("isCover", "false");

        console.log("Product to upload:", product.get("name"));
        try {
            const response = await axios.post(`${API_URL}/products`, product, {
            headers: {
                    'Content-Type': 'multipart/form-data',
            },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading product:', error);
            throw error;
        }
    },
    
    findById: async (id: number) => { 
        const response = await fetch(`${API_URL}/products/${id}`);
        return response.json();
    },

    findFeatured: async () => { 
        const response = await fetch(`${API_URL}/products/featured`);
        return response.json();
    }

}