import React from "react";
import { useState } from "react";
import { userLogin, userVerify } from "../services/services.js";
import { useAuth } from "../Context/AuthContext.jsx";
import toast from 'react-hot-toast';
function Login({ isOpen, onClose, onOpenSignup }) {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false)
  const [formInput, setInput] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput(prev => ({ ...prev, [key]: value }));
  }
  const {setUser} = useAuth();
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { token,name,email } = await userLogin(formInput);
      localStorage.setItem('token', token);
      setUser({name,email});
      toast.success('logged in...');
      onClose();
    } catch (er) {
      toast.error(er.error || 'something went wrong');
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[320px] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="mb-4 text-center text-xl font-semibold">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-3 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <button 
          disabled ={loading}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700" 
          >
            {loading ? 
              (<div className="w-5 h-5 border-2 border-white animate-spin rounded-full m-auto"></div>) : 
              "Login"
            }
          </button>
        </form>
        <p><button className="text-sm text-blue-800 " onClick={() => { onClose(); onOpenSignup() }}>
          Not an account? SignUp
        </button></p>
      </div>
    </div>
  );
}

export default Login;
