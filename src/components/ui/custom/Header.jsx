import React from 'react';

function Header() {
  return (
    <div className="bg-white py-4">
      <div className="max-w-screen-xl mx-auto flex justify-start items-center pl-0 ml-5"> {/* More left alignment */}
        {/* Logo and "TravelScape" text */}
        <div className="text-black text-4xl font-bold font-serif transform transition duration-300 ease-in-out hover:scale-105">
          <span>TravelScape</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
