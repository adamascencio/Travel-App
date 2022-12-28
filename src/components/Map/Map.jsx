import GoogleMapReact from 'google-map-react';
import { MapMarkers } from '../MapMarkers/MapMarkers';
import { useMediaQuery } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';

export default function Map({ coordinates, setCoordinates, setBounds, places, setChildClicked }) {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const markers = places?.map((place, idx) => {
    return <MapMarkers key={idx} lat={Number(place.latitude)} lng={Number(place.longitude)} place={place} isMobile={isMobile} />;
  });

  return (
    <StyledEngineProvider injectFirst>
      <div style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{ lat: 0, lng: 0 }}
          center={coordinates}
          defaultZoom={14}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(evt) => {
            setCoordinates({ lat: evt.center.lat, lng: evt.center.lng });
            setBounds({ ne: evt.marginBounds.ne, sw: evt.marginBounds.sw });
          }}
          onChildClick={(child) => setChildClicked(child)}
        >
          {markers}
        </GoogleMapReact>
      </div>
    </StyledEngineProvider>
  );
}