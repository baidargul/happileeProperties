import axios from "axios";
import { favourite } from "./favourite";
import { interest } from "./interest";
import { propertyStatus } from "@prisma/client";
import { Amenities } from "./amenities";
const apiPath = `/api/property`;
async function GET_ALLOTMENT_STRUCTURE() {
  const response = await axios.get(`${apiPath}/structure`);
  return response.data;
}

async function initializeDefaults() {
  const types = [
    { name: "Farm House", type: "Residential" },
    { name: "Apartment", type: "Residential" },
    { name: "Independent House/Villa", type: "Residential" },
    { name: "Plot/Land", type: "Residential" },
    { name: "Office Space", type: "Commercial" },
    { name: "Shop/Showroom", type: "Commercial" },
    { name: "Commercial Land", type: "Commercial" },
    { name: "Warehouse/Godown", type: "Commercial" },
    { name: "Industrial Building", type: "Commercial" },
    { name: "Industrial Shed", type: "Commercial" },
    { name: "Agricultural Land", type: "Commercial" },
    { name: "Hotel/Resort", type: "Commercial" },
    { name: "Guest House", type: "Commercial" },
  ];

  const allotmentTypes = [
    "Residential",
    "Commercial",
    // "Industrial",
    // "Agricultural",
    // "Others",
  ];

  const allotmentFor = ["Sell", "Rent"];

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

  const furnishing = ["Semi Furnished", "Fully Furnished", "Unfurnished"];

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

  const ownership = [
    "Freehold",
    "Leasehold",
    "Cooperative",
    "Society",
    "Power of attorney",
  ];

  const data = {
    types,
    allotmentTypes,
    allotmentFor,
    bhkTypes,
    furnishing,
    amenities,
    ownership,
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

async function create(data: any) {
  try {
    const res = await axios.post(apiPath, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const response = await res.data;
    return response;
  } catch (error: any) {
    console.error("Error while creating property:", error);
    console.error("ERROR:", error.message);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

async function changeStatus(id: string, status: propertyStatus) {
  const data = {
    id: id,
    status: status,
  };
  const response = await axios.patch(`${apiPath}/status`, data);
  return response;
}

async function list(id: string) {
  const response = await axios
    .get(`${apiPath}/id?id=${id}`)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });
  return response;
}

export type FILTER_TYPE = {
  minPrice?: number; // Minimum price value
  maxPrice?: number; // Maximum price value
  propertyTypeIds?: string[]; // List of property type IDs as strings
  bhkTypeIds?: string[]; // List of BHK type IDs as strings
  furnishingTypeIds?: string[]; // List of furnishing type IDs as strings
  allotmentForIds?: string[]; // List of allotment IDs as strings
  ownerShipTypeIds?: string[]; // List of ownership type IDs as strings
  userIds?: string[]; // List of user IDs as strings
  area?: number; // Minimum area value
  title?: string; // Title for partial text matching
  minAge?: number; // Minimum age
  maxAge?: number; // Maximum age
  minMonthlyMaintenance?: number; // Minimum monthly maintenance
  maxMonthlyMaintenance?: number; // Maximum monthly maintenance
  minSecurityDeposit?: number; // Minimum security deposit
  maxSecurityDeposit?: number; // Maximum security deposit
  minRent?: number; // Minimum rent
  maxRent?: number; // Maximum rent
  status?: string; // Status value (e.g., 'active', 'inactive')
  description?: string; // Description for partial text matching
  minCarpetArea?: number; // Minimum carpet area
  maxCarpetArea?: number; // Maximum carpet area
  minFloorNumber?: number; // Minimum floor number
  maxFloorNumber?: number; // Maximum floor number
  minTotalFloorsInBuilding?: number; // Minimum total floors in building
  maxTotalFloorsInBuilding?: number; // Maximum total floors in building
  facingDirection?: string; // Facing direction value (e.g., 'North', 'South')
  parkingSpace?: boolean; // Indicates availability of parking space
};

async function filter(filters: FILTER_TYPE) {
  const response = await axios.post(`${apiPath}/filter`, filters);
  return response;
}

export const property = {
  initializeDefaults,
  GET_ALLOTMENT_STRUCTURE,
  Amenities,
  create,
  listAll,
  list,
  changeStatus,
  favourite,
  interest,
  filter,
};
