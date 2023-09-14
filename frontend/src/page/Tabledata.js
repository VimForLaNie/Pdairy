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

function createData(tag, date) {
  return { tag, date};
}

const rows = [
  createData("#4678371", "17/09/66"),
  createData("#9897422", "25/09/66"),
  createData("#7460983", "19/10/66"),
  createData("#2408969", "29/10/66"),
  createData("#0008943", "31/10/66"),
  createData("#5584828", "11/11/66"),
  createData("#5470994", "18/10/66"),
  createData("#5586307", "02/11/66"),
  createData("#9440366", "09/11/66"),
  createData("#5861861", "13/12/66"),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Tag Cow</StyledTableCell>
            <StyledTableCell align="center">Predict mating day</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.tag}>
              <StyledTableCell component="th" scope="row" align='center'>
                {row.tag}
              </StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
