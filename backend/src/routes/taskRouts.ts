

import express from "express"
import { createTask, getAlltaks, updateTaskStatus } from "../controller/taskController.js"



const router=express.Router()


router.get("/tasks",getAlltaks)
router.post("/tasks",createTask)
router.patch("/tasks/:id",updateTaskStatus)
router.delete("/tasks/:id",)


export default router