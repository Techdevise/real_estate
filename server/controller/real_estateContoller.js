const axios = require("axios");
require("dotenv").config();

const REGRID_TOKEN = process.env.REGRID_TOKEN;

const demoParcel = {
  uuid: "demo-uuid-123",
  owner: "John Doe",
  address: "123 Demo St, Demo City, Demo State",
  area_sqft: 1000,
  zoning: "Residential",
  value: 500000
};
const demoParcels = [
  { id: 1, name: "Marion County", state: "Indiana", lat: 39.7684, lon: -86.1581 },
  { id: 2, name: "Dallas County", state: "Texas", lat: 32.7767, lon: -96.7970 },
  { id: 3, name: "Wilson County", state: "Tennessee", lat: 36.2520, lon: -86.2971 },
  { id: 4, name: "Durham County", state: "North Carolina", lat: 36.0014, lon: -78.9382 },
  { id: 5, name: "Fillmore County", state: "Nebraska", lat: 41.5590, lon: -97.8963 },
  { id: 6, name: "Clark County", state: "Wisconsin", lat: 43.1345, lon: -87.8650 },
  { id: 7, name: "Gurabo Municipio", state: "Puerto Rico", lat: 18.3362, lon: -65.9728 },
];

module.exports = {
getProperties: async (req, res) => {
  try {
   minLon = -108.757
minLat = 44.7525
maxLon = -122.4
maxLat = 37.8

    const url = `https://app.regrid.com/api/v2/parcels?bbox=${minLon},${minLat},${maxLon},${maxLat}&token=${REGRID_TOKEN}`;
    const resp = await axios.get(url);


    if (resp.data.features && resp.data.features.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All parcel properties fetched successfully",
        data: resp.data.features.map(f => f.properties),
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No real parcels found, returning demo data for testing",
        data: [demoParcel],
      });
    }
  } catch (error) {
    console.error("Error fetching parcels:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Regrid API error: " + (error.response?.data?.message || error.message),
    });
  }
},

getParcelByLocation: async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required"
      });
    }

    const url = `https://app.regrid.com/api/v2/parcels/point?lat=${lat}&lon=${lon}&token=${REGRID_TOKEN}`;
    const resp = await axios.get(url);

    // Prepare unified data with fallback to demoParcel if empty
    const data = {
      parcels: resp.data?.parcels?.features?.length ? resp.data.parcels : demoParcel.parcels,
      buildings: resp.data?.buildings?.features?.length ? resp.data.buildings : demoParcel.buildings,
      zoning: resp.data?.zoning?.features?.length ? resp.data.zoning : demoParcel.zoning,
    };
// console.log(data.parcels.features[0].properties);

    
    res.json({
      success: true,
      message: "Parcel, building, and zoning data returned",
      data
    });

  } catch (error) {
    console.error("Error fetching parcel by location:", error.message);
    res.status(500).json({
      success: false,
      message: "Regrid API error",
      data: demoParcel
    });
  }
},



  // 🆔 Parcel ID (UUID) se fetch
 getParcelById: async (req, res) => {
  try {
    const uuid = req.params.uuid;
    if (!uuid) {
      return res.status(400).json({ 
        success: false, 
        message: "Parcel ID is required" 
      });
    }

    const url = `https://app.regrid.com/api/v2/parcels/query?fields[ll_uuid][eq]=${uuid}&token=${REGRID_TOKEN}`;
    const resp = await axios.get(url);



    // Use optional chaining and fallback
    const parcelData = resp.data?.parcels?.features?.[0]?.properties || demoParcel.parcels.features[0].properties;

    res.json({
      success: true,
      message: "Parcel found by ID",
      data: parcelData
    });

  } catch (error) {
    console.error("Error fetching parcel by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Regrid API error",
      data: demoParcel.parcels.features[0].properties
    });
  }
}

};
