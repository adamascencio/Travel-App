import { Paper, Typography, Rating } from '@mui/material';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MapMarkers({ isMobile, place }) {
  const Marker = isMobile ? (
    <FontAwesomeIcon
      icon={faLocationDot}
      color='red'
      size='xl'
    />
  ) : (
    <Paper sx={{ ':hover': { boxShadow: 20 } }}> 
      <img 
        src={
          place.photo ? 
            place.photo.images.large.url 
            : 
            'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        }
        alt={place.name} 
      />
      <Typography align='center' variant='subtitle2'>{place.name}</Typography>
      <Rating value={parseFloat(place.rating)} readOnly />
    </Paper>
  );

  return Marker;
}