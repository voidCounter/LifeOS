import {Languages} from "@/types/Language";
import axios from "axios";
import {Categories} from "@/types/Categories";

export async function fetchCategories(): Promise<Categories> {
    const {data}: { data: Categories} = await axios.get('/api/categories');
    return data;
}
