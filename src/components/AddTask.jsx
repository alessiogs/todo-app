import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { addTask } from '../api/api'

const AddTask = ({ userId, tasks, setTasks }) => {

    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        completed: false,
        userId: userId
    })

    const handleShowForm = () => {
        if (showForm) {
            setShowForm(false)
            setFormData({
                title: '',
                completed: false,
                userId: userId
            })
        } else {
            setShowForm(true)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, title: e.target.value })
    }

    const handleAddTask = async () => {
        const { data } = await addTask(formData)
        setTasks([ ...tasks, data ])
        handleShowForm()
    }

    return (
        <div className='w-full shadow-lg rounded-lg my-2 bg-slate-200'>
            {showForm ?
            <button className='text-red-700 hover:text-red-500 bg-slate-300 rounded-t-lg w-full flex-center p-2 transitions' onClick={handleShowForm}>
                <FontAwesomeIcon icon={faMinus} /><span className='mx-1'></span>Annulla 
            </button> :
            <button className='text-white bg-sky-800 hover:bg-sky-900 rounded-lg w-full flex-center p-2 transitions' onClick={handleShowForm}>
                <FontAwesomeIcon icon={faPlus} /><span className='mx-1'></span> Nuovo task
            </button>}
            {showForm &&
            <div className={`p-4 flex flex-row transitions`}>
                <textarea
                    autoFocus
                    value={formData.title}
                    onChange={handleChange}
                    rows={1}
                    className='resize-none overflow-auto w-full rounded-lg px-3 py-2 mx-2'
                    placeholder='Nuovo task'
                />
                <button onClick={handleAddTask} className='mx-2 bg-sky-800 hover:bg-sky-900 p-2 rounded-lg text-white transitions' type='submit'>
                    Aggiungi
                </button>
            </div>}
        </div>
    )
}

export default AddTask