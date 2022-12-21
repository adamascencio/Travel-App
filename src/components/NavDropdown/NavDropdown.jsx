import PlaceSearch from '../PlaceSearch/PlaceSearch';
import './NavDropdown.css';

export default function NavDropdown({ setCoordinates, onLoad, onPlaceChanged, isMobile, isMdScreen }) {
  return (
    <nav>
      <div>
        <h1>Travel Buddy</h1>
      </div>
      <div>
        <PlaceSearch setCoordinates={setCoordinates} onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
      </div>
    </nav>
  );
}