import { useEffect, useState } from "react"
import { getAlltask } from "../services/taskServices"
import type { Task } from "../types/types"




const TaskList = () => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await getAlltask()
                setTasks(res)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        fetchTask()

    }, [])

    return (
        <>

            <div>

                <div>

                    {tasks.map(task => {
                        return (

                            <div>
                                <div>{task.title}</div>
                                <p>{task.description}</p>
                                <p>{task.priority}</p>
                                <select value={task.status}>
                                    <option value="todo">todo</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="done">done</option>

                                </select>
                                <button>delete</button>

                            </div>


                        )
                    })}

                </div>






            </div>


        </>
    )
}

export default TaskList