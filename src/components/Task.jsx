import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { deleteTask, editTask } from "../api/api"

const Task = ({ task, tasks, setTasks }) => {

    const [editMode, setEditMode] = useState(false)

    const [formData, setFormData] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, title: e.target.value })
    }

    const handleSetEditMode = () => {
        if (editMode) {
            setEditMode(false)
            setFormData('')
        } else {
            setEditMode(true)
            setFormData({
                id: task.id,
                title: task.title,
                userId: task.userId,
                completed: task.completed
            })
        }
    }

    const handleEditTask = async () => {
        try {
            const { data } = await editTask(task.id, formData)
            setTasks(tasks.map(singleTask => singleTask.id === task.id ? data : singleTask))
            handleSetEditMode()
        } catch (error) {
            console.log(error)
            alert('Attenzione! Non è stato possibile modificare il task. Riprova più tardi!')
        }
    }

    const handleCheckTask = async () => {
        try {
            const { data } = await editTask(task.id, { ...task, completed: !task.completed })
            setTasks(tasks.map(singleTask => singleTask.id === task.id ? data : singleTask))
        } catch (error) {
            console.log(error)
            alert('Attenzione! Non è stato possibile segnare il task come "completato". Riprova più tardi!')
        }
    }

    const handleDeleteTask = async () => {
        try {
            await deleteTask(task.id)
            setTasks(tasks.filter(singleTask => singleTask.id !== task.id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-slate-200 p-2 my-2 rounded-lg w-full flex flex-row justify-between items-center shadow'>
            <div className='flex flex-row items-center w-full'>
                <div className='mx-2 flex-center group'>
                    <input
                        type='checkbox'
                        className='cursor-pointer scale-125'
                        checked={task.completed}
                        onChange={handleCheckTask}
                    />
                    <span className='absolute z-10 scale-0 group-hover:scale-100 transitions text-sm mt-16 p-2 rounded-lg bg-slate-800/80 text-white'>
                        {task.completed ? 'Da fare' : 'Fatto'}
                    </span>
                </div>
                <div className='flex justify-start items-center mx-2 w-full'>
                    {!editMode ? 
                    task.completed ? <del>{task.title}</del> : task.title :
                    <div className='flex-center w-full'>
                        <textarea
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus
                            rows={1}
                            className='resize-none overflow-auto w-full rounded-lg px-3 py-2 mx-2'
                        />
                        <button onClick={handleEditTask} className='p-2 mx-2 bg-sky-800 hover:bg-sky-900 text-white rounded-lg transitions'>
                            Conferma
                        </button>
                        </div>}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div onClick={handleSetEditMode} className={`flex justify-center items-center py-1 text-lg cursor-pointer hover:text-green-600 ${editMode && 'text-green-500'} transitions group`}>
                    <FontAwesomeIcon icon={faEdit} />
                    <span className='absolute z-10 scale-0 group-hover:scale-100 transitions text-sm mb-16 p-2 rounded-lg bg-slate-800/80 text-white'>
                        {editMode ? 'Annulla' : 'Modifica'}
                    </span>
                </div>
                <div onClick={handleDeleteTask} className='flex justify-center items-center py-1 text-lg cursor-pointer hover:text-red-600 transitions group'>
                    <FontAwesomeIcon icon={faTrash} />
                    <span className='absolute z-10 scale-0 group-hover:scale-100 transitions text-sm mt-16 p-2 rounded-lg bg-slate-800/80 text-white'>
                        Elimina
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Task