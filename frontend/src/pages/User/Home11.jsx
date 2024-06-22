import React, { useState } from 'react';
import { motion } from 'framer-motion';
import pngs1 from "../../Asserts/pngs1.png";
import Image2 from "../../Asserts/Image2.jpg";
import { Link } from 'react-router-dom';

function Home() {
  // Define an array of real quotes
  const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Life is what happens when you're busy making other plans. - John Lennon"
  ];

  // State to keep track of the current quote index
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Function to handle next quote
  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  // Function to handle previous quote
  const prevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex === 0 ? quotes.length - 1 : prevIndex - 1));
  };

  return (
    <div className='h-[50rem]'>
       <div className="bg-cover  h-full bg-center bg-opacity-50" style={{ backgroundImage: `url(${Image2})`, backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <div className="#0B0C10 text-white font-serif">
        {/* Hero section with title */}
        <div className="bg-black bg-opacity-50">
        <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-yellow-400"
          >
            <span style={{ fontFamily: 'Montserrat' }} className="text-white">Welcome to the Events Management System</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg"
            style={{ fontFamily: 'Montserrat' }}
          >
            Plan, organize, and manage your events with ease.
          </motion.p>
          <button className=' my-6 px-6 py-3 rounded-full text-white font-bold bg-gradient-to-r font-[Montserrat] from-orange-500 to-yellow-500'>SCORES</button>
          </div>
        </div>
      </div>
      {/* <div className="bg-gradient-to-r from-[#263c57] to-[#0B0C10] border-none rounded-[30px] h-[25rem] mx-10 flex justify-end items-center relative">
       
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[35rem]"
          src={pngs1}
          alt="football.png"
        />
       
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-0 p-8 text-white z-10"
        >
          <p className="text-[1.5rem] text-yellow-700 font-bold w-1/2 mb-4">{quotes[currentQuoteIndex]}</p>
          

          <div className="flex items-center justify-between">
            <button onClick={prevQuote} className="text-white">
              &lt;
            </button>
            <button onClick={nextQuote} className="text-white">
              &gt;
            </button>
          </div>
        </motion.div>
        

        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-8 left-10 px-6 py-3 rounded-full text-white font-bold bg-gradient-to-r from-orange-500 to-yellow-500"
          >
            View Events
          </motion.button>
        </Link>
      </div> */}
    </div></div>
  );
}

export default Home;
