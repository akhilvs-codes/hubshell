

import { title } from "node:process"
import {z} from "zod"


export const createTaskSchema=z.object({
    title:z.string().min(1,"Title is required"),
    description:z.string().optional(),
    priority:z.enum(["low","medium","high"])

})

export const updateStatusSchema=z.object({
    status:z.enum(["todo","in-progress","done"])
})