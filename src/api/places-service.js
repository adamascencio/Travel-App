import axios from 'axios';

export async function getPlacesData(type, sw, ne) {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng
      }, 
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatedGetPlacesData(type, sw, ne) {
  try {
    const { data: { data } } = await axios.post(
    `https://travel-advisor.p.rapidapi.com/${type}/v2/list`, {
      params: {
        boundingBox: {
          northEastCorner: {
            latitude: ne.lat,
            longitude: ne.lng,
          },
          southWestCorner: {
            latitude: sw.lat,
            longitude: sw.lng,
          }
        }
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
