import { userRegister } from '../services/services.js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

function Register({ isOpen, onClose, onOpenLogin }) {
    const {setUser} = useAuth();
    const [loading,setLoading] = useState(false);
    const nav = useNavigate();
    const [formInput,setInput] = useState({name : '',email:'',password:''});
    if (!isOpen) return null;
    const handleSwitch = () => {
        onClose();
        onOpenLogin();
    }
    const handleChange = (e)=>{
        const key = e.target.name;
        const value = e.target.value;
        setInput(prev=>({...prev,[key]:value}));
    }
    const handleSubmit = async(e) => {

        try {
            e.preventDefault();
            setLoading(true);
            // console.log(formInput);
            const {token} = await userRegister(formInput);
            localStorage.setItem('token',token);
            setUser({name:formInput.name,email:formInput.email});
            toast.success('User Registered');
            onClose();
        } catch (er) {
            toast.error(er.error || 'something went wrong');
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60'>
            <div className='relative w-[320px] p-6 text-center bg-white rounded '>
                <button disabled={loading} className='absolute top-3 right-3' onClick={() => onClose()}>✕</button>
                <h2 className='text-2xl m-1 font-bold'>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='name' onChange={handleChange} placeholder='Name' className='border p-3 m-1 rounded w-full' />
                    <input type="text" name='email' onChange={handleChange} placeholder='EmailID' className='border p-3 m-1 rounded w-full' />
                    <input type="password" name='password' onChange={handleChange} placeholder='Password' className='border p-3 m-1 rounded w-full' />
                    <button type="submit" className='bg-blue-600 text-white rounded p-3 m-1 w-full ' disabled={loading}>
                        {loading?(<div className='w-5 h-5 border-2 animate-spin rounded-4xl m-auto'></div>):"Submit"}
                    </button>
                </form>
                <p className='text-sm text-blue-800' onClick={handleSwitch}>Already registered? Login</p>
            </div>
        </div>
    )
}

export default Register;
