

import axios from "axios";
import {Product} from "@/types";

export async function getProductsById(id: string | string[]): Promise<Product | undefined>{
    

    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
            
        return response.data
    } catch (error) {
        console.error("Error in getProductsById",error);
    }
}

