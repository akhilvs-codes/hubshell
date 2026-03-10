
import { z } from "zod";



export const createTaskSchema=z.object({
    title:z.string().min(3,"Title is required"),
    description:z.string().optional(),
    priority:z.enum(["low","medium","high"])

})
