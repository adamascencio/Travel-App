import GoogleMapReact from 'google-map-react';
import { MapMarkers } from '../MapMarkers/MapMarkers';
import { useMediaQuery } from '@mui/material';
import theme from './styles';
import { ThemeProvider } from '@mui/material/styles';

export default function Map({ coordinates, setCoordinates, setBounds, places, setChildClicked }) {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const classes = theme;
  const markers = places?.map((place, idx) => {
    return <MapMarkers key={idx} lat={Number(place.latitude)} lng={Number(place.longitude)} place={place} isMobile={isMobile} />;
  });

  return (
    <ThemeProvider theme={classes}>
      <div style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{ lat: 0, lng: 0 }}
          center={coordinates}
          defaultZoom={14}
          options={''}
          onChange={(evt) => {
            setCoordinates({ lat: evt.center.lat, lng: evt.center.lng });
            setBounds({ ne: evt.marginBounds.ne, sw: evt.marginBounds.sw });
          }}
          onChildClick={(child) => setChildClicked(child)}
        >
          {markers}
          {console.log('Map')}
        </GoogleMapReact>
      </div>
    </ThemeProvider>
  );
}