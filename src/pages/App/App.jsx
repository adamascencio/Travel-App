import { useState, useEffect } from 'react';
import { getPlacesData } from '../../api/places-service';
import NavDropdown from '../../components/NavDropdown/NavDropdown';
import HomePage from '../HomePage/HomePage';
import './App.css';

export default function App() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [defaultBounds, setDefaultBounds] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMap, setShowMap] = useState(false);

  async function getPlaces(type, sw, ne) {
      const places = await getPlacesData(type, sw, ne);
      if (places) {
        setPlaces(places.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setRating('');
        setIsLoading(false);
      }
  }

  const onLoad = (ac) => setAutocomplete(ac);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat, lng});
    if (isMobile && !showMap) {
      setIsLoading(true);
      getPlaces(type, defaultBounds.sw, defaultBounds.ne);
    }
  }

  // Track window size to determine if mobile
  useEffect(() => {
    window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);

    window.addEventListener('resize', () => {
      window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  // Get user's coordinates at start of app
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  // Set default bounds for List view on mobile
  useEffect(() => {
    if (coordinates.lat) {
      const sw = {
        lat: coordinates.lat - 0.1,
        lng: coordinates.lng - 0.1
      }
      const ne = {
        lat: coordinates.lat + 0.1,
        lng: coordinates.lng + 0.1
      }
      setDefaultBounds({sw, ne});
    }
  }, [coordinates]);

  // Get places data from Rapid API Travel Advisor
  useEffect(function() {
    setIsLoading(true);
    if (bounds) {
      getPlaces(type, bounds.sw, bounds.ne);
    } else {
      const sw = {
        lat: coordinates.lat - 0.1,
        lng: coordinates.lng - 0.1
      }
      const ne = {
        lat: coordinates.lat + 0.1,
        lng: coordinates.lng + 0.1
      }
      getPlaces(type, sw, ne);
    }
  }, [type, bounds, coordinates]);

  // Filter places by rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  useEffect(() => setChildClicked(0), [places]);

  return (
    <main className="App">
      <NavDropdown 
        setCoordinates={setCoordinates} 
        onLoad={onLoad} 
        onPlaceChanged={onPlaceChanged} 
        isMobile={isMobile}
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
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        isMobile={isMobile} 
        type={type} 
        setType={setType} 
        rating={rating} 
        setRating={setRating}   
        showMap={showMap}
        setShowMap={setShowMap}
      />
    </main>
  );
}
