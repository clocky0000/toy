const axios = require('axios')

const API_KEY = '구글api키'

async function getLocation(address){
const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data
  
  if(!data || data.status === "ZERO_RESULTS"){
  	const error = new HttpError("에러", 422)
    throw error
  }
  const locationData = data.results[0].geometry.location
  
  return locationData
  
}

modules.exports = getLocation

const createData = async (req, res, next) => {
	const {title, address} = req.body
    let locationData
    try{
    	locationData = await getLocation(address)
    }catch(error){return next(error)}
  	const createData = {
      title,
      location : locationData,
      address
    }
    DUMMY_DATA.push(createData)
  
  res.status(201).json({createData})
}