import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: 'url("/6345959.jpg")' }} // Update the image path to use forward slashes and ensure it's correct
    >
      <div className="text-center px-8">
        <h1 className="font-extrabold text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px] mb-4">
          TravelScape - <span className="text-blue-500">Plan your dream getaway with ease</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
          Our Travel Assistant is here to help you create the perfect trip by suggesting exciting destinations, comfortable stays, and personalized itineraries.
          Whether you're exploring a new city or relaxing at a beach resort, we’ve got you covered.
        </p>
        <Link to={'/create-trip'}>
          <Button className="text-xl mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </Button>
        </Link>
        
      </div>
    </div>
  );
}

export default Hero;
