import axios from 'axios'
const url =  import.meta.env.VITE_API_URL || "http://localhost:5000/api" ;

export const createNote = async(newNote)=>{
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${url}/notes/addnote`,newNote,{
            headers : {
                authorization : token
            }
        })
        return res.data;
    } catch (error) {
        throw error.response?.data || {error : "something went wrong"};
    }
}

// export const getNotes = async(page)=>{
//     try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`${url}/notes/getnotes/${page}`,{
//             headers:{
//                 authorization:token
//             }
//         })
//         return res.data;
//     } catch (error) {
//         console.log('error fetching notes',error.message);
//         throw error.response?.data || {error : "something went wrong"};
//     }
// }
export const getNotes = async(page)=>{
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${url}/notes/getnotes`,{
            headers:{
                authorization:token
            }
        })
        return res.data;
    } catch (error) {
        console.log('error fetching notes',error.message);
        throw error.response?.data || {error : "something went wrong"};
    }
}

export const updateNote = async (noteId, payload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${url}/notes/updateNote/${noteId}`,
      payload,
      {
        headers: {
          authorization: token
        }
      }
    );

    return res.data;
  } catch (error) {
    throw error.response?.data || { error: "update failed" };
  }
};


export const deleteNote = async (noteId) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${url}/notes/deleteNote/${noteId}`,
    {
      headers: { authorization: token }
    }
  );

  return res.data;
};
