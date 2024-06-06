// import React from 'react'
// import './Background.css'
// import video1 from '../assets/video1.mp4'
// import image1 from '../assets/image1.png'
// import image2 from '../assets/image2.png'
// import image3 from '../assets/image3.png'
// import Navbar from './Navbar'


// const Background = ({playStatus , heroCount}) => {
//   if (playStatus) {
//     return (
//       <video className='background' autoPlay loop muted>
//         <source src={video1} type='video/mp4' />
//         <Navbar />
//       </video>
//     )
//   }
//   else if (heroCount===0) {
//     return <img src={image1} alt="" className='background'/>
//   }
//   else if (heroCount===1) {
//     return <img src={image2} alt="" className='background'/>
//   }
//   else if (heroCount===2) {
//     return <img src={image3} alt="" className='background'/>
//   }
// }

// export default Background


import React from 'react';
import './Background.css';
import video1 from '../assets/video1.mp4';
import image1 from '../assets/image1_.png';
import image2 from '../assets/image2_.png';
import image3 from '../assets/image3_.png';
import Navbar from './Navbar';
import Hero from './Hero';

const Background = ({ playStatus, heroCount , setPlayStatus , setHeroCount , heroData}) => {

  // console.log("heroData:", heroData);

  if (playStatus) {
    return (
      <div className='background-container'>
        <video className='background-video fade-in' autoPlay loop muted>
          <source src={video1} type='video/mp4' />
        </video>
        <Navbar />
        <Hero 
          heroData={heroData}
          setPlayStatus={setPlayStatus}
          heroCount={heroCount} 
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
      </div>
    );
  } else {
    let backgroundImage;
    if (heroCount === 0) {
      backgroundImage = image1;
    } else if (heroCount === 1) {
      backgroundImage = image2;
    } else if (heroCount === 2) {
      backgroundImage = image3;
    }

    return (
      <div className='background-container'>
        <img src={backgroundImage} alt="" className='background-image fade-in' />
        <Navbar />
        <Hero 
          heroData={heroData}
          setPlayStatus={setPlayStatus}
          heroCount={heroCount} 
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
      </div>
    );
  }
};

export default Background;
