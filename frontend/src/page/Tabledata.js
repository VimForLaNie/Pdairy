import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 28,
    fontFamily: 'Roboto Slab, serif',
    backgroundColor: '#105ba2',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Roboto Slab, serif',
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BasicTable() {
  const [users, setUsers] = React.useState([]); // Initialize as an empty array

  React.useEffect(() => {
    const fetchUserData = () => {
      fetch("../api/getCows/")
        .then(async (res) => {
          const cowes = await res.json();
          const arr = [];

          for (let i = 0; i < cowes.length; i++) {
            // if (cowes[i].breedingPrediction != null) {
              arr.push({
                tag: cowes[i].name,
                breeding: cowes[i].breedingPrediction,
              });
            // }
          }

          // Set the users state with the fetched data
          setUsers(arr);
        });
    };

    fetchUserData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Cow's name</StyledTableCell>
            <StyledTableCell align="center">Predict mating day</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.tag}>
              <StyledTableCell component="th" scope="row" align='center'>
                {row.tag}
              </StyledTableCell>
              <StyledTableCell align="center">{row.breeding}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
