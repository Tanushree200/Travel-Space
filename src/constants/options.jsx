export const SelectTravelesList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole travel in exploration',
      icon: '🧍‍♂️', // Single person emoji
      people: '1',
    },
    {
      id: 2,
      title: 'Couple',
      desc: 'A romantic getaway for two',
      icon: '💑', // Couple emoji
      people: '2',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'An adventure for the whole family',
      icon: '👨‍👩‍👧‍👦', // Family emoji
      people: '3-6',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A fun trip with your squad',
      icon: '👯‍♀️', // Friends dancing emoji
      people: '3+',
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💸', // Money with wings emoji for budget-conscious travel
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'A balance between comfort and cost',
      icon: '💵', // Dollar bill emoji for moderate spending
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Indulge in premium experiences',
      icon: '💎', // Diamond emoji for luxury travel
    },
  ];
  
export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'
