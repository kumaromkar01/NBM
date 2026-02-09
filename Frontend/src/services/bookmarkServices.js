import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

export const addBookmark = async (data) => {

    try {
        const token = localStorage.getItem('token');
        const res = await api.post('/bookmarks/add', data,{
            headers:{
                authorization:token
            }
        })
        return res.data
    } catch (error) {
        throw error.response?.data  || "error in adding bookmark";
    }
  
}

export const deleteBookmark = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.delete(`/bookmarks/deleteBookmark/${id}`,{
            headers:{
                authorization:token
            }})
        return res.data
    } catch (error) {
        throw error.response?.data  || "error in deleting bookmark";
    }
 
}

export const getAllBookmarks = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.get('/bookmarks/all',{
            headers:{
                authorization:token
            }})
        return res.data
    } catch (error) {
        throw error.response?.data || "error in fetching bookmark";
    }
  
}