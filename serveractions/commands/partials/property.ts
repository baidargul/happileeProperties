import axios from "axios";
const apiPath = `/api/property`;
async function GET_ALLOTMENT_STRUCTURE() {
  const response = await axios.get(`${apiPath}/structure`);
  return response.data;
}

async function initializeDefaults() {
  const types = [
    { name: "House", type: "Residential" },
    { name: "Apartment", type: "Residential" },
    { name: "Villa", type: "Residential" },
    { name: "Office", type: "Commercial" },
    { name: "RetailShop", type: "Commercial" },
    { name: "ShowRoom", type: "Commercial" },
    { name: "Warehouse", type: "Commercial" },
  ];

  const allotmentTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Agricultural",
    "Others",
  ];

  const allotmentFor = ["Sell", "Buy", "Rent"];

  const bhkTypes = [
    "1BHK",
    "2BHK",
    "3BHK",
    "4BHK",
    "5BHK",
    "6BHK",
    "7BHK",
    "8BHK",
    "9BHK",
    "10BHK",
  ];

  const finishingTypes = ["Semi Furnished", "Fully Furnished", "Unfurnished"];

  const amenities = [
    "A/C & Heating",
    "Garages",
    "Swimming Pool",
    "Parking",
    "Lake View",
    "Garden",
    "Disabled Access",
    "Pet Friendly",
    "Ceiling Height",
    "Outdoor Shower",
    "Refrigerator",
    "Fireplace",
    "Wifi",
    "TV Cable",
    "Barbeque",
    "Laundry",
    "Dryer",
    "Lawn",
    "Elevator",
    "Security",
    "Gym",
    "Sauna",
    "Jacuzzi",
    "Balcony",
    "High-Speed Internet",
    "Concierge Service",
    "Playground",
    "Furnished Units",
    "Trash Compactor",
    "24-Hour Surveillance",
    "Bicycle Storage",
    "Conference Room",
    "Business Center",
    "Storage Units",
    "Tennis Court",
    "Basketball Court",
    "Soccer Field",
    "Bocce Ball Court",
    "Yoga Studio",
    "Car Wash Area",
    "Green Roof",
    "Rooftop Lounge",
    "Game Room",
    "Billiards Room",
    "Movie Theater",
    "Library",
    "Sun Deck",
    "Dog Park",
    "Dog Wash Station",
    "Picnic Area",
    "Clubhouse",
    "On-Site Maintenance",
    "On-Site Management",
    "Package Receiving",
    "Smoke-Free",
    "Walking Trails",
    "Golf Course Access",
    "Boat Dock",
    "Private Beach",
    "Wine Storage",
    "Recycling Center",
    "Electric Vehicle Charging Stations",
    "Garden Tub",
    "Walk-In Closets",
    "Stainless Steel Appliances",
    "Granite Countertops",
    "Solar Panels",
    "Central Vacuum System",
    "Security Patrol",
    "Valet Parking",
    "Soundproof Walls",
    "Heated Floors",
    "Smart Home Features",
    "Intercom System",
    "Storm Shelter",
    "Keyless Entry",
    "In-Unit Safe",
    "Double Pane Windows",
    "Outdoor Kitchen",
    "Private Entrance",
    "Wood Flooring",
    "Custom Cabinets",
    "Backup Generator",
    "All-Inclusive Utilities",
    "Housekeeping Service",
    "Butler Service",
    "Personal Trainer",
    "Massage Room",
    "Meditation Room",
    "Virtual Golf Simulator",
    "Ski Storage",
    "Co-Working Space",
    "Mail Room",
    "Snack Bar",
    "Coffee Bar",
    "Juice Bar",
    "Fishing Pier",
  ];

  const data = {
    types,
    allotmentTypes,
    allotmentFor,
    bhkTypes,
    finishingTypes,
    amenities,
  };

  const response = await axios.post(`${apiPath}/structure`, data);
  return response.data;
}

async function listAll() {
  const response = await axios.get(apiPath).then(async (res) => {
    const response = await res.data;
    return response;
  });
  return response;
}

export const property = {
  initializeDefaults,
  GET_ALLOTMENT_STRUCTURE,
  listAll,
};
