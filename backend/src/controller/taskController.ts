
import { Request, Response } from "express"
import { createTaskSchema, updateStatusSchema } from "../validators/taskValidator.js"
import taskModel from "../model/taskModel.js"
import { RetryAgent } from "undici-types"

export const createTask = async (req: Request, res: Response) => {

    try {
        const { data, success, error } = createTaskSchema.safeParse(req.body)
        if (error) {
            res.status(400).json(error)
        }
        const task = await taskModel.create(data)

        res.json(201).json({ message: "success", task })


    } catch (error) {
        res.status(400).json({ error: "internal server error" })
    }

}


export const updateTaskStatus = async (req: Request, res: Response) => {


    try {
        const { data, error } = updateStatusSchema.safeParse(req.body)
        const taskId = req.params

        if (error) {
            res.status(400).json(error)
        }

        const task = await taskModel.updateOne({ id: taskId }, { status: data?.status }, { new: true })

        res.json(201).json({ message: "success", task })

    } catch (error) {

        res.status(400).json({ error: "internal server error" })

    }
}



export const getAlltaks = async (req: Request, res: Response) => {
    try {

        const { page = 1, limit = 10, status } = req.query
        const filter: { status?: string } = {}
        if (status) {
            filter.status = String(status)
        }
        const skip = Number(page) - 1 * Number(limit)

        const tasks = await taskModel.find(filter).sort({createdAt:-1}).skip(skip).limit(Number(limit))

        res.status(200).json(tasks)

    } catch (error) {
        res.status(400).json({ error: "internal server error" })

    }
}



export const deleteTask = async (req: Request, res: Response) => {

    try {
        const taskId=req.params
        await taskModel.findByIdAndDelete(taskId)

    } catch (error) {
        res.status(400).json({ error: "internal server error" })

    }

}
