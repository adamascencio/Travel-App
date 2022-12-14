import { useState, useEffect, createRef } from 'react';
import { Grid, Typography, InputLabel, MenuItem, FormControl, Select, CircularProgress } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import './List.css';

export default function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places.length).fill().map((_, idx) => elRefs[idx] || createRef());
    setElRefs(refs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);
  
  return (
    <StyledEngineProvider injectFirst>
      <section>
        <Typography variant='h5' className='heading'>Restaurants, Hotels & Attractions around you</Typography>
        {isLoading ? (
          <div>
            <CircularProgress size='5rem' />
          </div>
        ) : (
          <>
            <div className='input-row'>
              <FormControl>
                <InputLabel>Type</InputLabel>
                <Select variant='standard' value={type} onChange={(evt) => setType(evt.target.value)} >
                  <MenuItem value='restaurants'>Restaurants</MenuItem>
                  <MenuItem value='hotels'>Hotels</MenuItem>
                  <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Rating</InputLabel>
                <Select variant='standard' value={rating} onChange={(evt) => setRating(evt.target.value)} >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={3}>Above 3.0</MenuItem>
                  <MenuItem value={4}>Above 4.0</MenuItem>
                  <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Grid container spacing={3} className='location-col'>
              {places?.map((place, idx) => {
                return ( 
                  <Grid item key={idx} xs={12} ref={elRefs[idx]}>
                    <PlaceCard place={place} selected={Number(childClicked) === idx} refProp={elRefs[idx]} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )
          }
      </section>
    </StyledEngineProvider>
  );
}