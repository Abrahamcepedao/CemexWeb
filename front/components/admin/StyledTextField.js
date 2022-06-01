import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

/* Material UI - Input */
const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  '& label': {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: '0.875rem',
  },
  '& .MuiInput-underline:after': {
    //borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius: 25,
    fontSize: '0.8rem',
    height: '40px',
    color: 'white',
    flex: '1 !important',
    width: '100% !important',
    marginRight: '20px !important',
    //border: '1px solid rgba(255, 255, 255, 0.21)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.21)',
      //marginRight: '15px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.21)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.21)',
    },
  },
});

export { StyledTextField }