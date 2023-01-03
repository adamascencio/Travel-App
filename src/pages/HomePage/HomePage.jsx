import { useState } from "react";
import List from "../../components/List/List";
import Map from "../../components/Map/Map";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import './HomePage.css';

export default function HomePage({ coordinates, setCoordinates, bounds, setBounds, places, childClicked, setChildClicked, isLoading, setIsLoading, type, setType, rating, setRating, isMobile }) {
  const [showMap, setShowMap] = useState(false);
  const map = () => {
    return (
      <Map 
        coordinates={coordinates} 
        setCoordinates={setCoordinates} 
        bounds={bounds}
        setBounds={setBounds}
        places={places}
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
        places={places} 
        childClicked={childClicked}
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
        type={type}
        setType={setType}
        rating={rating} 
        setRating={setRating}
        isMobile={isMobile}
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
    <div className='home-grid'>
      { !isMobile && list() }
      { !isMobile && map() }
      { isMobile && showMapBtns() }
      { isMobile && !showMap && list() }
      { isMobile && showMap && map() }
    </div>
  );
}