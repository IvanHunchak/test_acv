import axios from "axios";
import {Product} from "@/types";

export async function getProductsBySearch(value : string): Promise<Product[] | undefined >{
    try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${value}`);

        return response.data.products
    } catch (error) {
        console.error("Error in getAllProducts",error);
    }
}