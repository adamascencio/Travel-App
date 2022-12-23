import { useState, useEffect } from 'react';
// import { getPlacesData } from '../../utilities/places-service';
import NavDropdown from '../../components/NavDropdown/NavDropdown';
import HomePage from '../HomePage/HomePage';
import { data } from '../../dummy'
import './App.css';

export default function App() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = (ac) => setAutocomplete(ac);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat, lng});
  }

  // Get user's coordinates at start of app
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  // Get places data from Rapid API Travel Advisor
  // useEffect(function() {
  //   if (bounds) {
  //    setIsLoading(true);
  //    async function getPlaces() {
  //      const places = await getPlacesData(type, bounds.sw, bounds.ne);
  //      setPlaces(places);
  //      setFilteredPlaces([]);
  //      setRating('');
  //      setIsLoading(false);
  //    }
  //   }
  //   getPlaces();
  // }, [type, coordinates, bounds]);

  // Filter places by rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  // Add dummy data at start of app
  // useEffect(function() {
  //   setPlaces(data.data.filter((place) => place.name !== undefined));
  // }, []);

  return (
    <main className="App">
      <NavDropdown 
        setCoordinates={setCoordinates} 
        onLoad={onLoad} 
        onPlaceChanged={onPlaceChanged} 
      />
      <HomePage 
        places={filteredPlaces.length ? filteredPlaces : places}
        childClicked={childClicked}
        setChildClicked={setChildClicked}
        coordinates={coordinates} 
        setCoordinates={setCoordinates} 
        bounds={bounds} 
        setBounds={setBounds} 
        onLoad={onLoad} 
        onPlaceChanged={onPlaceChanged} 
        isLoading={isLoading} setIsLoading={setIsLoading} 
        type={type} 
        setType={setType} 
        rating={rating} 
        setRating={setRating}   
      />
    </main>
  );
}
