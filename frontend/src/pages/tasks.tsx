import { useEffect, useState } from "react"
import CreateTaskForm from "../components/CreateTaskForm"
import TaskList from "../components/TaskList"
import { getAlltask } from "../services/taskServices"
import type { Task } from "../types/types"



const Tasks = () => {


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








  return (
    <div className="flex gap-10">

      <TaskList loading={loading} tasks={tasks} setTasks={setTasks} setError={setError} />
      <CreateTaskForm setTasks={setTasks} />

      {error && <p className="text-red-500">{error}</p>}

    </div>
  )
}

export default Tasks