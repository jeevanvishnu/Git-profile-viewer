import React from 'react'
import { Routes , Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LikePage from './pages/LikePage'
import ExplorePage from './pages/ExplorePage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='flex text-white'>
      <Sidebar/>
      <div className=' max-w-5xl my-5 text-white m-auto transition-all duration-300 flex-1' >
        <Routes>
          <Route path='/' element={<HomePage/>}/> 
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/likes' element={<LikePage/>}/>
          <Route path='explore' element={<ExplorePage/>} />
        </Routes>
        <Toaster/>
      </div>
    </div>
  )
}

export default App