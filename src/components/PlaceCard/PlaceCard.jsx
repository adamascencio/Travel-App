import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Chip, Rating } from '@mui/material';
import { faAward, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledEngineProvider } from '@mui/material/styles';
import './PlaceCard.css';

export default function PlaceCard({ place }) {
  const awards = place?.awards?.map((award, idx) => {
    return (
      <Box display='flex' justifyContent='space-between' key={idx}>
        <FontAwesomeIcon className='icon' icon={faAward} />
        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
      </Box>
    );
  });

  return (
    <article>
      <StyledEngineProvider injectFirst>
        <Card className='place-card' elevation={4} id={place.location_id} sx={{borderRadius: 5}}>
          <CardMedia 
            component='img'
            height='180'
            image={place.photo !== undefined ?
                place.photo.images.medium.url
                :
                'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
              }
            alt={place.name}
          />
          <CardContent>
            <Typography align='left' variant='h6'>{place.name}</Typography>
            <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
              <Rating readOnly value={parseFloat(place.rating)} />
              <Typography variant='subtitle2'>{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' >
              <Typography>Price</Typography>
              <Typography variant='subtitle2'>{place.price_level}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' >
              <Typography>Ranking</Typography>
              <Typography variant='subtitle2'>{place.ranking}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' >
              <Typography></Typography>
              <Typography variant='subtitle2'>{place.awards}</Typography>
            </Box>
            {awards}
            <Box display='flex' justify-content='flex-start' align-items='center' sx={{ flexWrap: 'wrap', my: 2 }}>
              {place?.cuisine?.map(({name}, idx) => {
                return <Chip key={idx} size='small' label={name} sx={{ mb: 0.5, mr: 0.5 }}/>;
              })}
            </Box>
            {place.address && (
              <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
                <FontAwesomeIcon icon={faLocationDot} />
                <Typography variant='body2' align='right'>{place.address}</Typography>
              </Box>
            )}
            {place.phone && (
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <FontAwesomeIcon icon={faPhone} />
                <Typography variant='body2'>{place.phone}</Typography>
              </Box>
            )}
          </CardContent>
          <CardActions>
            <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')} >Trip Advisor</Button>
            <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')} >Website</Button>
          </CardActions>
        </Card>
      </StyledEngineProvider>
    </article>
  );
}