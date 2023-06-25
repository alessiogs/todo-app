import axios from 'axios'

const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

export const getTasks = async (userId) => await axios.get(`${apiUrl}?userId=${userId}`)
export const addTask = async (formData) => await axios.post(apiUrl, formData)
export const editTask = async (postId, formData) => await axios.put(`${apiUrl}/${postId}`, formData)
export const deleteTask = async (postId) => await axios.delete(`${apiUrl}/${postId}`)