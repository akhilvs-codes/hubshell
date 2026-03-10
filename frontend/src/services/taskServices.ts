import axiosApi from "../api/axios"
import type { Task } from "../types/types"





export const getAlltask = async ():Promise<Task[]> => {
    try {
        const res = await axiosApi.get("/tasks")
        
        return res.data

    } catch (error) {
        throw error
    }
}


export const createTask = async (data:Task):Promise<Task> => {
    try {
        const res = await axiosApi.post("/tasks",data)
        return res.data.task
        

    } catch (error) {
        throw error
    }
}
