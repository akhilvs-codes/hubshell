import { useEffect, useState } from "react"
import { deleteTask, getAlltask } from "../services/taskServices"
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
                console.log(res);

            } catch (error) {
                setError("error-fetching data")
            } finally {
                setLoading(false)
            }
        }
        fetchTask()

    }, [])



    const deleteHandler = async (id: string) => {

        try {

            const deleteRun = async () => {
                await deleteTask(id)

            }
            deleteRun()

            setTasks((prev) => {
                return prev.filter(task => task._id != id)
            })

        } catch (error) {
            setError("error-delete task")

        }



    }




    return (
        <>
            <div>
                {loading ? (
                    <p>{loading}</p>
                ) :

                    <div className="">
                        <div className="flex gap-8">
                            <p>title</p>
                            <p>description</p>
                            <p>priority</p>
                        </div>

                        {tasks.map(task => {
                            return (

                                <div className=" flex gap-8 " key={task._id}>
                                    <div>{task.title}</div>
                                    <p>{task.description}</p>
                                    <p>{task.priority}</p>
                                    <select value={task.status}>
                                        <option value="todo">todo</option>
                                        <option value="in-progress">in-progress</option>
                                        <option value="done">done</option>

                                    </select>
                                    <button onClick={() => deleteHandler(task._id!)}>delete</button>

                                </div>


                            )
                        })}

                    </div>
                }


            </div>


        </>
    )
}

export default TaskList