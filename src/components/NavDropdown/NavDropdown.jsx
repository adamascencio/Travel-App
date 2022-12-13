import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import PlaceSearch from '../PlaceSearch/PlaceSearch';
import './NavDropdown.css';

export default function NavDropdown({ setCoordinates, onLoad, onPlaceChanged, isMobile, isMdScreen }) {
  const [showMenu, setShowMenu] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(true);
  const menuBtn = toggleBtn ? 
    <FontAwesomeIcon icon={faBars} size='xl' onClick={toggleMenu} className='ham-btn' /> 
    : 
    <FontAwesomeIcon icon={faXmark} size='xl' onClick={toggleMenu} className='x-btn' />;

  function toggleMenu() {
    setShowMenu(!showMenu);
    setToggleBtn(!toggleBtn);
    document.querySelector('ul').classList.toggle('hidden');
  }

  return (
    <nav>
      <div>
        <h1>Travel Buddy</h1>
        <ul className='hidden'>
          <li>Itineraries</li>
        </ul>
      </div>
      <div>
        <PlaceSearch setCoordinates={setCoordinates} onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
        {menuBtn}
      </div>
    </nav>
  );
}