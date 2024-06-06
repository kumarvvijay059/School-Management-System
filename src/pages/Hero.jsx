import React from 'react'
import './Hero.css'
import arrow_btn from '../assets/arrow_btn.png'
import play_icon from '../assets/play_icon.png'
import pause_icon from '../assets/pause_icon.png'

const Hero = ({heroData , setPlayStatus , heroCount  , setHeroCount , playStatus}) => {

  console.log("heroData:", heroData);

  // const text1 = heroData && heroData.text1 ? heroData.text1 : "xcxc";
  // const text2 = heroData && heroData.text2 ? heroData.text2 : "xcxc";
  return (
    <div className='hero'>
      <div className='hero-text'>
        {heroData.map((item, index) => (
        <div key={index}>
          <p>{item.text1}</p>
          <p>{item.text2}</p>
          <hr /> {/* Optional: Add a horizontal line between each item */}
        </div>
      ))}
      </div>
      <div className="hero-explore">
        <p>Explore the features</p>
        <img src={arrow_btn} alt="" />
      </div>
      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li onClick={() => setHeroCount(0)} className={heroCount===0?"hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(1)} className={heroCount===1?"hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(2)} className={heroCount===2?"hero-dot orange" : "hero-dot"}></li>
        </ul>
        <div className="hero-play">
          <img onClick={() => setPlayStatus(!playStatus)} src={playStatus?pause_icon:play_icon} alt="" />
          <p>See the Video</p>
        </div>
      </div>
    </div>
  )
}

export default Hero