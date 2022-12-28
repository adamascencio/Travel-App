import List from "../../components/List/List";
import Map from "../../components/Map/Map";
import './HomePage.css';

export default function HomePage({ coordinates, setCoordinates, bounds, setBounds, places, childClicked, setChildClicked, isLoading, setIsLoading, type, setType, rating, setRating, isMobile }) {
  return (
    <div className='home-grid'>
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
    </div>
  );
}