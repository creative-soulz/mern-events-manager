import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image1 from "../../Asserts/Image1.jpg";
import Image2 from "../../Asserts/Image2.jpg";
import Image3 from "../../Asserts/Image3.jpg";

const Home = () => {
  return (
    <>
    
    <div className="#0B0C10 text-white font-serif">
      {/* Hero section with title */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-yellow-400"
        >
          <span  style={{ fontFamily: 'Montserrat' }} className="text-white">Welcome to the Events Management System</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg mb-8"
          style={{ fontFamily: 'Montserrat' }}
        >
          Plan, organize, and manage your events with ease.
        </motion.p>
      </div>

      {/* Carousel section for changing images */}
      <div className="max-w-screen-lg mx-auto mb-12 relative">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={5000} // Change interval duration as needed
          className="rounded-lg shadow-lg overflow-hidden"
          style={{ fontFamily: 'Montserrat' }}
        >
          <div className="relative">
            <img src={Image1} alt="Image1" className="w-full h-auto" />
            <div className="absolute  left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-400 mb-4"
                style={{ fontFamily: 'Montserrat' }}>
                  "Your next great Image1 event starts here!"
                </h2>
                <p className="text-lg text-yellow-400"
                style={{ fontFamily: 'Montserrat' }}>
                  Plan, organize, and manage Image1 events seamlessly.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={Image2} alt="Image2" />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  bg-black bg-opacity-50">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4"
                style={{ fontFamily: 'Montserrat' }}>
                  "Experience the excitement of Image2!"
                </h2>
                <p className="text-lg text-red-500
                "style={{ fontFamily: 'Montserrat' }}>
                  Plan, organize, and manage Image2 events effortlessly.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={Image3} alt="Image3" />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  bg-black bg-opacity-50">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-red-500 mb-4"style={{ fontFamily: 'Montserrat' }}>
                  "Serve, set, spike! Your Image3 event awaits."
                </h2>
                <p className="text-lg text-blue-500"style={{ fontFamily: 'Montserrat' }}>
                  Plan, organize, and manage Image3 events smoothly.
                </p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Lines to show top departments */}
      <div className="max-w-screen-md mx-auto mb-12">
        <hr className="my-8 border-t border-gray-300" />
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-blue-500">Top</span> Departments
        </h2>
        <ul className="list-disc pl-8">
          <li className="text-lg text-yellow-500 mb-2">Department A</li>
          <li className="text-lg text-red-500 mb-2">Department B</li>
          <li className="text-lg text-blue-500 mb-2">Department C</li>
          {/* Add more departments as needed */}
        </ul>
      </div>
    </div>
    
    </>
    
  );
};

export default Home;
