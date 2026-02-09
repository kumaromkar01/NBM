import axios from 'axios'
const url =  import.meta.env.VITE_API_URL || "http://localhost:5000/api" ;


export const userRegister = async(payload)=>{
    try {
        const res =  await  axios.post(`${url}/auth/register`,payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || {error : "something went wrong"};
    }
}

export const userLogin = async(payload)=>{
    try {
        const res = await axios.post(`${url}/auth/login`,payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || {error : "something went wrong"};
    }
}

export const userVerify = async(token)=>{
    try {
        const res = await axios.get(`${url}/auth/verify`,{
            headers : {
                authorization : token
            }
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || {error : "something went wrong"};
    }
}
