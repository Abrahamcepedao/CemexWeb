import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: theme.palette.common.white,
    border: 0,
    fontWeight: 'bold',
    opacity: '0.6'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
    border: 0,
  },
}));

export { StyledTableCell };