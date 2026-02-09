import React from 'react'
import Landing from './pages/Landing'
import Manager from './pages/Manager'
import AddNotes from './components/AddNotes'
import AddBookmark from './components/AddBookmark'
import {Route,Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/notes' element={<ProtectedRoute><Manager type="note"  /></ProtectedRoute>}></Route>
        <Route path='/addnote' element={<ProtectedRoute><AddNotes/></ProtectedRoute>}/>
        {/* <Route path='/updatenote' element={<ProtectedRoute><UpdateNote/></ProtectedRoute>}/> */}
        <Route path='/addbookmark' element={<ProtectedRoute><AddBookmark/></ProtectedRoute>}/>
        {/* <Route path='/updatebookmark' element={<UpdateBookmark/>}/> */}
        <Route path='/bookmark' element={<ProtectedRoute><Manager type="bookmark" /></ProtectedRoute>}></Route>

      </Routes>
    </>
  )
}

export default App
