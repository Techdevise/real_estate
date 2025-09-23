const axios = require("axios");
const { Property } = require("../models");
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

  const data = {
  parcels: resp.data?.parcels && resp.data.parcels.features
    ? resp.data.parcels
    : demoParcel.parcels,
  buildings: resp.data?.buildings && resp.data.buildings.features
    ? resp.data.buildings
    : demoParcel.buildings,
  zoning: resp.data?.zoning && resp.data.zoning.features
    ? resp.data.zoning
    : demoParcel.zoning,
};

    if (data.parcels.features && data.parcels.features.length > 0) {
      const parcelFeature = data.parcels.features[0];
      const props = parcelFeature.properties;
      const geometry = parcelFeature.geometry;

      let latitude = parseFloat(props.fields?.lat) || parseFloat(lat);
      let longitude = parseFloat(props.fields?.lon) || parseFloat(lon);

      if (!props.fields?.lat || !props.fields?.lon) {
        const coordinates = geometry.coordinates[0][0];
        const centerLon = coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length;
        const centerLat = coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length;
        longitude = centerLon;
        latitude = centerLat;
      }

      const areaSqft =
        props.fields?.sqft ||
        props.fields?.ll_gissqft ||
        props.fields?.ll_bldg_footprint_sqft ||
        0;

      const areaAcre =
        props.fields?.gisacre ||
        props.fields?.ll_gisacre ||
        areaSqft / 43560;

      // ✅ check if already exists
      const parcelId =
        props.fields?.parcelnumb ||
        props.fields?.parcelnumb_no_formatting ||
        props.fields?.state_parcelnumb ||
        "";

      let existing = await Property.findOne({ where: { parcelId } });

      if (!existing) {
        await Property.create({
          parcelId,
          ownerName: props.fields?.owner || "Unknown",
          area: areaAcre,
           location: props.fields?.address || `${props.fields?.saddno || ""} ${props.fields?.saddstr || ""} ${props.fields?.saddsttyp || ""}`.trim(),
          latitude,
          longitude,
          price: 0,
          image: "",
          status: 1,
          zoning: props.fields?.zoning || "",
          useCode: props.fields?.usecode || "",
          useDescription: props.fields?.usedesc || "",
          legalDescription: props.fields?.legaldesc || "",
          block: props.fields?.block || "",
          city: props.fields?.scity || "",
          state: props.fields?.state2 || "",
          zipCode: props.fields?.szip5 || "",
          buildingCount: props.fields?.ll_bldg_count || 0,
          buildingArea: props.fields?.ll_bldg_footprint_sqft || 0,
        });

        console.log(`✅ Property stored: ${parcelId || "Unknown Parcel"}`);
      } else {
        console.log(`⚠️ Property already exists: ${parcelId}`);
      }
    } else {
      console.log("No parcel features found in response");
    }

    res.json({
      success: true,
      message: "Parcel, building, and zoning data returned",
      data,
    });
  } catch (error) {
    console.error("Error fetching parcel by location:", error.message);
    res.status(500).json({
      success: false,
      message: "Regrid API error, using demo data",
      data: demoParcel,
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

      const url = `https://app.regrid.com/api/v2/parcels/query?fields?[ll_uuid][eq]=${uuid}&token=${REGRID_TOKEN}`;
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
