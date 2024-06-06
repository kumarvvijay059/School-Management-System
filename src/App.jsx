import React, { useEffect, useState } from 'react'
import {SignUp , Login , Homepage , Home_student , Home_teacher , Forgot_password , Update_password} from './pages';
import {Routes , Route} from 'react-router-dom'
import Background from './pages/Background';
import Navbar from './pages/Navbar';

const App = () => {

  const [token , setToken] = useState(false)
  if(token){
    sessionStorage.setItem('token' , JSON.stringify(token))
  }

  useEffect(()=> {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  } , [])

  const heroData = [
    {text1: "Achieving Excellence " , text2:"Together"},
    {text1: "Innovate , Educate ," , text2:"Elevate"},
    {text1: "Discover the joy" , text2:"of learning"},
  ];

  // console.log("heroData:", heroData);


  const [heroCount , setHeroCount] = useState(0);
  const [playStatus , setPlayStatus] = useState(false);

  useEffect(() =>{
    setInterval(() => {
      setHeroCount((count) => {return count==2?0:count+1})
    }, 3000);
  } , [])

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login setToken={setToken}/>} />
        {token?<Route path='/homepage' element={<Homepage token={token}/>} />:""}
        <Route path='/' element={<Background playStatus={playStatus} heroCount={heroCount} setPlayStatus={setPlayStatus} setHeroCount={setHeroCount} heroData={heroData}/>}/>
        <Route path='/navbar' element={<Navbar />} />
        {token?<Route path='/home_student' element={<Home_student token={token}/>} />:""}
        {token?<Route path='/home_teacher' element={<Home_teacher token={token}/>} />:""}
        <Route path='/forgot_password' element={<Forgot_password />} />
        <Route path='/update_password' element={<Update_password />} />
      </Routes>
    </div>
  )
}

export default App