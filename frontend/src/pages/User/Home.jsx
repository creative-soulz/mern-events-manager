import React, { useState, useEffect } from 'react';
import pngs1 from "../../Asserts/pngs1.png";
import pngs2 from "../../Asserts/pngs2.png";
 import pngs3 from "../../Asserts/pngs3.png";
 import pngs4 from "../../Asserts/pngs4.png";

 import { Link } from 'react-router-dom';
import Highscore from "./HighScore";


function Home() {
  const [images, setImages] = useState([pngs1, pngs2,pngs3,pngs4]); // Add more images as needed
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 3 seconds (3000 milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <>
    <div  className=''>
      <div className='h-[80rem] '>
        <div className='py-16 px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-yellow-400">
            <span style={{ fontFamily: 'Montserrat' }} className="text-white"> Events Management System</span>
          </h1>
        </div>
        <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mb-30'>
          <div className='grad  rounded-xl backdrop-filter  border border-gray-600 rounded-br-[80px] md:p-9 px-4 py-9'>
            <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-20'>
              <div className='md:w-3/5'>
                <h2 className='md:text-7xl text-4xl font-bold text-yellow-700 mb-6 leading-relaxed'>PARTICIPATE AND <span className=''>ENJOY</span> </h2>
                <p className='text-white text-2xl mb-8'>TRACK THE SCORES OF EACH TEAM WITH JOY!!!</p>
                <div>
                  <Link to='/point'>
                  <button className='py-2 px-8 bg-yellow-700 font-semibold text-white rounded hover:bg-yellow-800'>VIEW SCORES</button></Link>
                </div>
              </div>
              <div>
                <img src={images[currentIndex]} alt="" className='lg:h-[390px] md:h-[300px]' />
              </div>
            </div>
          </div>
          <div className=' my-7'>
            < Highscore></Highscore> 
          </div>
          {/* <div>
            <UpCommingEvent />
          </div> */}
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
