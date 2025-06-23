import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className=''>
        
        <img src={assets.header_img} alt="" />
        
        <h1>Hey Developer 
            <img className='' src={assets.hand_wave} alt="" />
        </h1>
        
        <h2>Welcome to our app</h2>
        
        <p>lets get starteddsa dfggggggggg  ggggggggggg ggggggggggg ggggggwesddf gggggggggg gggsdfasd ffffffffffff fffffff fffffffffsd afffff fffffffs dadfsdd</p>

        <button>Get Started</button>
    </div>
  )
}

export default Header