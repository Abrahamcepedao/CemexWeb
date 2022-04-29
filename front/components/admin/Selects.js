import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const TransparentInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    width: '100%',
    borderRadius: 25,
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.19)',
    border: '1px solid rgba(255, 255, 255, 0.21)',
    fontSize: 12,
    color: 'white',
    padding: '6px 10px',
    marginRight: '10px',
    outline: 'none',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 25,
      borderColor: 'rgba(255, 255, 255, 0.21)',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,0)',
    },
  },
}));

const WhiteInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  '& .MuiInputBase-root': {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    width: '100%',
    borderRadius: 25,
    position: 'relative',
    background: 'white',
    border: '1px solid rgba(14, 51, 127, 0.21)',
    fontSize: 16,
    color: 'gray',
    padding: '8px 10px',
    //marginBottom: '20px',
    flex: 1,
    outline: 'none',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 25,
      borderColor: 'rgba(14, 51, 127, 0.21)',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,0)',
    },
  },
}));

export { WhiteInput, TransparentInput };