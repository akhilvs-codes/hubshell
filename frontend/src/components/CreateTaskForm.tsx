



import React, { useState } from 'react'
import { createTaskSchema } from '../schemas/taskSchemas'
import { createTask } from '../services/taskServices'
import type { Task } from '../types/types'

const CreateTaskForm = ({setTasks}:{setTasks:React.Dispatch<React.SetStateAction<Task[]>>}) => {

    const [error, setError] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("low")



    const onHandleSubmit = (e:React.FormEvent) => {
        console.log("handler call");
        e.preventDefault()


        const res = createTaskSchema.safeParse({
            title,
            description,
            priority
        })

    
        
       if (!res.success) {
           console.log(res.error.issues[0].message)
        setError(res.error.issues[0].message)
        return
    }


        const createTaskRun = async () => {

            try {

         const data= await createTask(res.data)
         console.log("created data",data);
         

                setTasks(prev=>[data,...prev])
                setTitle("")
                setDescription("")
                setPriority("low")
                setError("")

            } catch (error) {
                setError("Failed to create task")
            }
        }

        createTaskRun()



    }
    return (
        <div className=''>

            <form onSubmit={onHandleSubmit} className='flex flex-col gap-4 '>

                <h2>create task</h2>

                {error && (
                    <p className='text-red-600 '>{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            <button type='submit'>create task</button>
            </form>


        </div>
    )
}

export default CreateTaskForm