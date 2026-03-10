import axiosApi from "../api/axios"
import type { Task } from "../types/types"





export const getAlltask = async ():Promise<Task[]> => {
    try {
        const res = await axiosApi.get("/")
        return res.data.task

    } catch (error) {
        throw error
    }
}