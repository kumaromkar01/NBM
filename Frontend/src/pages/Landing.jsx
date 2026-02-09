import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
function Landing() {

    const navigate = useNavigate();
    return (
        <div>
            <Toaster></Toaster>
            <NavBar />
            <Hero/>
        </div>
    )
}
export default Landing