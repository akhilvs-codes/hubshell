
import { deleteTask, updateTaskStatus } from "../services/taskServices"
import type { Task } from "../types/types"




const TaskList = ({ loading, tasks, setTasks,setError }: { loading: boolean, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> ,
    setError:React.Dispatch<React.SetStateAction<string>> 
}) => {


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


    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        try {

            const status = e.target.value
            const change = async () => {
                await updateTaskStatus(id, status)
            }
            change()

            setTasks(prev =>
                prev.map(task =>
                    task._id === id ? { ...task, status } : task
                )
            )
        } catch (error) {
            setError("error-update task")

        }
    }

    

    return (
        <>
            <div className="">
                {loading ? (
                    <p>{loading}</p>
                ) :

                    <div className="mt-18">
                        <div className="flex gap-4 font-bold text-2xl">
                            <p>title</p>
                            <p>description</p>
                            <p>priority</p>
                            <p>status</p>
                        </div>

                        {tasks.map(task => {
                            return (

                                <div className=" flex gap-18 justify-start mt-3 align-baseline" key={task._id}>
                                    <p>{task.title}</p>
                                    <p>{task.description}</p>
                                    <p>{task.priority}</p>
                                    <select value={task.status} onChange={(e) => changeStatus(e, task._id!)}>
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