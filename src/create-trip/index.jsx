import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details");
      return;
    }
    // Show the toast when the button is clicked
    toast("Fetching Details for your trip...", { duration: 10000 });

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const tripData = result?.response?.text(); // Assuming result is the data received from the AI

    // Navigate to ViewTrip page and pass the trip data
    navigate('/view-trip', { state: { tripData, location: formData?.location?.label } });
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-cover bg-center"
    style={{
      backgroundImage: 'url("/src/assets/bg.jpg")',
      backgroundSize: 'cover', // Ensures the image covers the entire background without stretching
      backgroundPosition: 'center',  }}>
      
      <div className="container mx-auto px-6 py-20 mt-0"> {/* Added mt-20 to shift down */}
        {/* Header Section in a container */}
        <div className="container mx-auto bg-white bg-opacity-75 p-10 mt-10 rounded-lg">
          <h2 className='font-bold text-3xl'>Tell us Your Travel Preferences</h2>
          <p className='mt-3 text-black text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
        </div>

        <div className="space-y-6 mt-6">
          {/* Destination */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className='text-xl my-3 font-medium'>What is the Destination of Choice?</h2>
            <GooglePlacesAutocomplete
              apikey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v); }
              }}
            />
            {place && (
              <p className="mt-4 text-green-600">
                You have selected: {place.label || "Unknown"}
              </p>
            )}
          </div>

          {/* Number of Days */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className='text-xl my-3 font-medium'>How Many Days Do You Want To Stay?</h2>
            <Input placeholder={'Ex.3'} type='number'
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>

          {/* Budget */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className='text-xl my-3 font-medium'>What is Your Budget</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title && 'shadow-lg border-black'}`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Travelers */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelesList.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('traveler', item.people)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler === item.people && 'shadow-lg border-black'}`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-center mt-10">
          <Button onClick={OnGenerateTrip} className='text-xl py-4 px-8 w-full md:w-auto bg-white text-black border border-black hover:bg-gray-100'>
            Generate Trip
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
