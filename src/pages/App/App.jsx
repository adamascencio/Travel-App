import { useState, useEffect } from 'react';
import { getPlacesData } from '../../api/places-service';
import NavDropdown from '../../components/NavDropdown/NavDropdown';
import List from '../../components/List/List';
import Map from '../../components/Map/Map';
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
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
  const [isMobile, setIsMobile] = useState(false);
  const [showMap, setShowMap] = useState(false);

   // Get places data from Rapid API Travel Advisor 
  async function getPlaces(type, sw, ne) {
    const places = await getPlacesData(type, sw, ne);
    setFilteredPlaces([]);
    setRating('');
    if (places) {
      setPlaces(places.filter((place) => place.name && place.num_reviews > 0));
      setIsLoading(false);
    } else {
      setPlaces([]);
      setIsLoading(false);
    }
  }

  const onLoad = (ac) => setAutocomplete(ac);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat, lng});
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

  // Get places data from Rapid API on map bounds change
  useEffect(function() {
    if ((!isMobile && bounds) || (isMobile && bounds && showMap)) {
      setIsLoading(true);
      getPlaces(type, bounds.sw, bounds.ne);
    } 
  }, [type, bounds, showMap, isMobile]);

  useEffect(function() {
    if (isMobile && coordinates && !showMap) {
      setIsLoading(true);
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
  }, [coordinates, isMobile, type, showMap]);

  // Filter places by rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  useEffect(() => setChildClicked(0), [places]);

  const map = () => {
    return (
      <Map 
        coordinates={coordinates} 
        setCoordinates={setCoordinates} 
        bounds={bounds}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
        rating={rating}
        childClicked={childClicked}
        setChildClicked={setChildClicked}
        isMobile={isMobile}
      />
    );
   }
   const list = () => {
    return (
      <List 
        places={filteredPlaces.length ? filteredPlaces : places} 
        childClicked={childClicked}
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
        type={type}
        setType={setType}
        rating={rating} 
        setRating={setRating}
      />
    );
   }
   const showMapBtns = () => {
    return (
      <ToggleButtonGroup className='map-ctrl-btns'>
        <ToggleButton selected={!showMap} value={false} onClick={() => setShowMap(false)}>List</ToggleButton>
        <ToggleButton selected={showMap} value={true} onClick={() => setShowMap(true)}>Map</ToggleButton>
      </ToggleButtonGroup>
    );
   };

  return (
    <main className="App">
      <NavDropdown 
        setCoordinates={setCoordinates} 
        onLoad={onLoad} 
        onPlaceChanged={onPlaceChanged} 
        isMobile={isMobile}
      />
      <div className='home-grid'>
        {/* Desktop */}
        { !isMobile && list() }
        { !isMobile && map() }

        {/* Mobile */}
        { isMobile && showMapBtns() }
        { isMobile && !showMap && list() }
        { isMobile && showMap && map() }
      </div>
    </main>
  );
}
