
import { NextFunction, Request, Response } from "express"
import { createTaskSchema, updateStatusSchema } from "../validators/taskValidator.js"
import taskModel from "../model/taskModel.js"


export const createTask = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { data, success, error } = createTaskSchema.safeParse(req.body)
        console.log(data);
        if (!success) {

            return res.status(400).json(error)
        }
        const task = await taskModel.create(data)

        return res.status(201).json({ message: "success", task })


    } catch (error) {

        return next(error)

    }

}


export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {

    try {



        const { data, success, error } = updateStatusSchema.safeParse(req.body)
        const taskId = req.params.id

        if (!success) {
            res.status(400).json(error)
        }
        console.log("update task", taskId, data?.status);

        const task = await taskModel.findByIdAndUpdate(taskId, { status: data?.status }, { new: true })

        console.log(task);

        res.status(201).json({ message: "success", task })

    } catch (error) {

        return next(error)


    }
}



export const getAlltaks = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log("Get all tasks");

        const { page = 1, limit = 10, status } = req.query
        const filter: { status?: string } = {}
        if (status) {
            filter.status = String(status)
        }
        const skip = (Number(page) - 1) * Number(limit)

        const tasks = await taskModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit))

        res.status(200).json(tasks)

    } catch (error) {
        return next(error)
    }
}



export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    console.log("delete");

    try {
        const taskId = req.params.useImperativeHandle(
          s,
          () => {
            second
          },
          [third],
        )
        await taskModel.findByIdAndDelete(taskId)

    } catch (error) {
        console.log(error, "error");

        return next(error)

    }

}
