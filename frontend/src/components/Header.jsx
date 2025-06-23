import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Header = () => {

  const {userData} = useContext(AppContent)
  return (
    <div className=''>
        
        <img src={assets.header_img} alt="" />
        
        <h1>Hey {userData ? userData.name : 'Developer'}! 
            <img className='' src={assets.hand_wave} alt="" />
        </h1>
        
        <h2>Welcome to our app</h2>
        
        <p>lets get starteddsa dfggggggggg  ggggggggggg ggggggggggg ggggggwesddf gggggggggg gggsdfasd ffffffffffff fffffff fffffffffsd afffff fffffffs dadfsdd</p>

        <button>Get Started</button>
    </div>
  )
}

export default Header