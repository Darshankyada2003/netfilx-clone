import React, { useEffect, useState } from 'react'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import Forgot from './Pages/Forgotpassword/Forgotpassword'
import Reset from './Pages/Resetpassword/Resetpassword'
import axios from 'axios'
import Profile from './Pages/Profile/Profile'

const App = () => {

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/settings`);
        setSettings(response.data);
      } catch {
        console.log("error");
      }
    };
    fetch();
  }, [])

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home settings={settings} />} />
        <Route path='/login' element={<Login settings={settings} />} />
        <Route path='/player/:id' element={<Player settings={settings} />} />
        <Route path='/forgot' element={<Forgot settings={settings} />} />
        <Route path='/resetpassword' element={<Reset settings={settings} />} />
        <Route path='/profile' element={<Profile settings={settings} />} />
      </Routes>
    </div>
  )
}

export default App
