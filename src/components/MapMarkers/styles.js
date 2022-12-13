import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '150px',
          position: 'absolute',
          zIndex: '1',
          cursor: 'pointer',

          '&:hover': {
            zIndex: '2',
          }
        }
      },
      defaultProps: {
        elevation: '5',
      }
    },
  }
});

export default theme;