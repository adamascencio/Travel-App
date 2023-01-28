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
  const options = {
    method: 'POST',
    url: `https://travel-advisor.p.rapidapi.com/${type}/v2/list`,
    params: {currency: 'USD', units: 'mi', lang: 'en_US'},
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    },
    data: `{"geoId":293928,"sort":"POPULARITY","sortOrder":"desc","filters":[{"id":"establishment","value":["10591"]}],"boundingBox":{"northEastCorner":{"latitude":${ne.lat},"longitude":${ne.lng}},"southWestCorner":{"latitude":${sw.lat},"longitude":${sw.lng}}},"updateToken":""}`
  }

  const res = axios.request(options).then(function (response) {
    // Get array of places from response 
    const places = response.data.data.AppPresentation_queryAppListV2[0].sections;
    // filter location data from places
    const locations = places.filter((place) => place.__typename === 'AppPresentation_SingleCard');
    return locations;
  }).catch(function (error) {
    console.error('error: ', error);
  });

  return res;
}
