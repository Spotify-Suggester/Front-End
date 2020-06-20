import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlusSign from '../svg/PlusSign'

const StyledTableCell = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    '&:first-child': {
     padding: '10px 0 0 20px',
    },
  },
  head: {
    backgroundColor: '#6C63FF',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(0,0,0,.45)',
    },
  },
}))(TableRow);

function createData(name, artist, year) {
  return { name, artist, year };
}

const rows = [
  createData('Señorita', 'Shawn Mendes', 2019),
  createData('Closer', 'The Chainsmokers', 2016),
  createData('Rather Be', 'Clean Bandit', 2014),
  createData('Dark Horse', 'Katy Perry', 2013),
  createData('Callaita', 'Bad Bunny', 2019),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


function ListComponent() {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Song Name</StyledTableCell>
            <StyledTableCell align="right">Artist</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row"><PlusSign color="#ff6584"/></StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.artist}</StyledTableCell>
              <StyledTableCell align="right">{row.year}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListComponent;
