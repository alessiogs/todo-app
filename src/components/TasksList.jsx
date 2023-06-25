import { useEffect, useState } from 'react'
import { getTasks } from '../api/api'
import Task from './Task'
import Loading from './Loading'
import AddTask from './AddTask'

const TasksList = ({ userId }) => {

    const [tasks, setTasks] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const handleGetTasks = async () => {
        try {
            const { data } = await getTasks(userId)
            setTasks(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => handleGetTasks(), 500)
    }, [])

    return (
        <div className='flex flex-col min-h-screen justify-start items-center max-w-3xl bg-slate-100 m-auto overflow-auto'>
            <img src='/src/assets/do.png' alt='logo to do' className='w-fit max-w-sm my-4' />
            <div className='w-full px-4'>
                <AddTask userId={userId} tasks={tasks} setTasks={setTasks} />
            </div>
            {tasks ?
            tasks.length ?
            <div className='flex-center flex-col w-full px-4 mb-4'>
                <div className='text-xl py-3 mt-4 border-t-2 w-1/2 flex-center'>
                    Da completare
                </div>
                {!tasks.filter(singleTask => !singleTask.completed).length &&
                <div className='my-4'>
                    Nessun task da completare!
                </div>}
                {tasks.filter(singleTask => !singleTask.completed).reverse().map(singleTask => <Task key={singleTask.id} task={singleTask} tasks={tasks} setTasks={setTasks} />)}
                <div className='text-xl py-3 mt-4 border-t-2 w-1/2 flex-center'>
                    Completati
                </div>
                {tasks.filter(singleTask => singleTask.completed).reverse().map(singleTask => <Task key={singleTask.id} task={singleTask} tasks={tasks} setTasks={setTasks} />)}
                {!tasks.filter(singleTask => singleTask.completed).length &&
                <div className='my-4'>
                    Nessun task completato!
                </div>}
            </div> :
            <div  className='p-4'>
                Nessun task inserito!
            </div> :
            !isLoading ?
            <div className='p-4 flex-center flex-col'>
                <div className='flex-center'>
                    Qualcosa è andato storto
                </div>
                <div>
                    Ricarica la pagina
                </div>
            </div> : <></>}
            {isLoading && <Loading />}
        </div>
    )
}

export default TasksList