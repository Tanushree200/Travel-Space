import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GOOGLE_API_KEY = 'AIzaSyCmEtz6erQ9FY8fyOZLWloVPSTKwpBm3Vc'; // Replace with your Google API key
const GOOGLE_CX = 'f45faf4bb02d84b23'; // Replace with your Google CSE CX ID


function ViewTrip() {
  const { state } = useLocation(); // Retrieve the trip data from the state
  const tripData = state?.tripData;
  const location = state?.location;

  const [hotelImages, setHotelImages] = useState([]);
  const [placeImages, setPlaceImages] = useState([]);
  const [locationImage, setLocationImage] = useState('');

  useEffect(() => {
    if (tripData) {
      const trip = JSON.parse(tripData);
      fetchLocationImage(location); // Fetch the location image
      fetchHotelImages(trip.hotelOptions);
      fetchPlaceImages(trip.itinerary);
    }
  }, [tripData, location]);

  const fetchLocationImage = async (location) => {
    const searchQuery = `${location}`;
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image`
    );
    const data = await res.json();
    const imageUrl = data.items?.[0]?.link;
    setLocationImage(imageUrl); // Set the fetched location image URL
  };

  const fetchHotelImages = async (hotelOptions) => {
    const hotelImagesArray = await Promise.all(
      hotelOptions.map(async (hotel) => {
        const searchQuery = `${hotel.hotelName} hotel`;
        const res = await fetch(
          `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image`
        );
        const data = await res.json();
        const imageUrl = data.items?.[0]?.link;
        return { hotelName: hotel.hotelName, imageUrl };
      })
    );
    setHotelImages(hotelImagesArray);
  };

  const fetchPlaceImages = async (itinerary) => {
    const placeImagesArray = await Promise.all(
      itinerary.map(async (day) => {
        const placesImages = await Promise.all(
          day.plan.map(async (place) => {
            const searchQuery = `${place.placeName}`;
            const res = await fetch(
              `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image`
            );
            const data = await res.json();
            const imageUrl = data.items?.[0]?.link;

            return {
              placeName: place.placeName,
              imageUrl,
              placeDetails: place.placeDetails || 'Details not available',
              ticketPricing: place.ticketPricing || 'Pricing not available',
              bestTimeToVisit: place.bestTimeToVisit || 'Timing not available',
              timeToTravel: place.timeToTravel || 'Travel time not available',
            };
          })
        );
        return { day: day.day, theme: day.theme, placesImages };
      })
    );
    setPlaceImages(placeImagesArray);
  };

  if (!tripData) {
    return <p className="text-center text-xl font-bold mt-10">No trip data found.</p>;
  }

  const trip = JSON.parse(tripData);

  return (
    <div
      className="min-h-screen bg-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url('/src/assets/6345959.jpg')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
      }}
    >
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        {/* Location Image at the Top */}
        {locationImage && (
          <div className="mb-8">
            <img
              src={locationImage}
              alt={location}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Place Name Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold text-gray-700 text-center">{location}</h2>
        </div>

        {/* Hotel Recommendations Section */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-2xl font-semibold text-gray-700 p-4 bg-gray-200 rounded-lg">Hotel Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trip.hotelOptions.map((hotel, index) => {
              const hotelImage = hotelImages.find((img) => img.hotelName === hotel.hotelName)?.imageUrl || '/default-hotel-image.jpg';
              return (
                <a
                  key={index}
                  href={`https://www.google.com/maps/search/?q=${encodeURIComponent(hotel.hotelAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h4 className="text-xl font-semibold">{hotel.hotelName}</h4>
                    <img
                      src={hotelImage}
                      alt={hotel.hotelName}
                      className="w-full h-40 object-cover rounded-md mt-4"
                    />
                    <p className="mt-2 text-md">{hotel.hotelAddress}</p>
                    <p className="font-bold text-md">Price: {hotel.price}</p>
                    <p className="font-bold text-md">Rating: {hotel.rating}</p>
                    <p className="mt-2">{hotel.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="my-10">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-2xl font-semibold text-gray-700 p-4 bg-gray-200 rounded-lg">Itinerary</h3>
          </div>
          {placeImages.map((day, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h4 className="text-xl font-semibold">Day {day.day}: {day.theme}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {day.placesImages.map((place, idx) => (
                  <a
                    key={idx}
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(place.placeName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h5 className="text-lg font-semibold">{place.placeName}</h5>
                      <img
                        src={place.imageUrl || '/default-place-image.jpg'}
                        alt={place.placeName}
                        className="w-full h-64 object-cover rounded-md mt-4"
                      />
                      <p className="mt-2">{place.placeDetails}</p>
                      <p className="font-bold text-md">Ticket Price: {place.ticketPricing}</p>
                      <p className="font-bold text-md">Best Time to Visit: {place.bestTimeToVisit}</p>
                      <p className="font-bold text-md">Time to Travel: {place.timeToTravel}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
