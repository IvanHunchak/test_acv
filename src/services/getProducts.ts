
import axios from "axios";
import {Product} from "@/types";

export async function getProducts(limit: number,skip: number): Promise<Product[] | undefined >{
    // console.log('limit',limit)
    // console.log('skip',skip)
    try {
        const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        return response.data.products
    } catch (error) {
        console.error("Error in getAllProducts",error);
    }
}