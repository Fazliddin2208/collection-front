import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Register from './pages/Register'
import Profile from './pages/Profile'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Main from './pages/Main'
import './styles/style.css'

export default function App() {
  return (
      <>
        <Header />
        <div className='container my-container'>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/me" element={<Profile />} />
          </Routes>
        </div>
      </>
  )
}