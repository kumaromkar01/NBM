import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import { useAuth } from '../Context/AuthContext';


function NavBar() {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const [Logoutdiv, showLogout] = useState(false);
    const [signupdiv, setSignup] = useState(false);
    const {user,isAuthenticated,setUser} = useAuth();
    const isloggedIn = isAuthenticated;
    const name = user?.name;
    const email = user?.email;

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        setUser(null);
        isAuthenticated
        showLogout(false);
    }
    return (<>
        <div id='navbar' className='flex justify-between items-center p-3 bg-[#bcc9db]'>
            <div>
                <img className='max-w-[5vw] min-w-6 rounded-4xl' src="/logo.png" alt="logo.png" />
            </div>
            <div id='leftNav' className='flex justify-between space-x-5'>
                <div className='hover:bg-white/50 hover:border-2 hover:border-amber-100 hover:rounded-xl p-1'>
                    <button onClick={() => navigate('/notes')}>
                        Notes
                    </button>
                </div>
                <div className='hover:bg-white/50 hover:border-2 hover:border-amber-100 hover:rounded-xl p-1'>
                    <button onClick={() => navigate('/bookmark')}>
                        Bookmarks
                    </button>
                </div>
                <div className='hover:bg-white/50 hover:border-2 hover:border-amber-100 hover:rounded-xl p-1'>
                    {isloggedIn ? (
                        <button onClick={() => showLogout(!Logoutdiv)}>
                            {name}
                        </button>
                    ) : (
                        <button onClick={() => setOpen(true)}>
                            Login
                        </button>
                    )}

                </div>
            </div>
        </div>
        {Logoutdiv && (
            <div  onMouseLeave={()=>showLogout(false)} className='fixed right-0.5 grid col-1 z-60 w-fit border p-1 bg-blue/10 backdrop-blur-md '>
                <div className='font-bold m-1'>{email}</div>
                <button className='bg-blue-400 text-white' onClick={handleLogout}>
                    Logout
                </button>
            </div>
        )}
        <Login isOpen={isOpen} onClose={() => setOpen(false)} onOpenSignup={() => setSignup(true)} />
        <Register isOpen={signupdiv} onClose={() => setSignup(false)} onOpenLogin={() => setOpen(true)} />
    </>
    )
}

export default NavBar
