import axios from "axios";

export async function deleteProductById (id: string | string[]) {
    try {
        
        const result = await axios.delete(`https://dummyjson.com/products/${id}`)
           

        return result
    } catch (error) {
        console.log("Error deleting product", error);
    }
}