import React, { useState, useContext, useEffect } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { UserContext } from '../contexts/UserContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlusSign from '../svg/PlusSign';
import MinusSign from '../svg/MinusSign';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';
import ArrowDown from '../svg/ArrowDown';
import ArrowUp from '../svg/ArrowUp';
import RadarChart from './RadarChart';
import { data } from '../data';

const StyledTableCell = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    '&:first-child': {
      padding: '10px 0 0 20px'
    }
  },
  head: {
    backgroundColor: '#6C63FF',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '& .MuiTableCell-root:first-child': {
      minWidth: '30px',
      width: '50px'
    },
    '& svg:hover path': {
      fill: '#cc3b58',
      cursor: 'pointer'
    }
  }
}))(TableRow);

function createData(id, name, album, artist) {
  return { id, name, album, artist };
}

const useStyle = makeStyles(() => ({
  container: {
    maxHeight: '75vh',
    '&::-webkit-scrollbar': {
      width: '10px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#383838'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#6c63ff'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#ff6584'
    }
  },
  normalRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(0,0,0,.45)'
    }
  }
}));

function ListComponent(props) {
  const {
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
    results,
    suggestions
  } = useContext(FavoritesContext);

  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    if (!userId) {
      setUserId(localStorage.getItem('userId'));
    }
  });

  let dataList = [];
  if (props.type === 'favorite') {
    dataList = favorites;
  } else {
    if (props.suggestions) {
      dataList = suggestions;
    } else {
      dataList = results;
    }
  }

  const classes = useStyle();

  const rows = dataList.map((result) => {
    return createData(result.id, result.name, result.album, result.artist);
  });

  return (
    <TableContainer
      className={props.type === 'favorite' ? classes.container : ''}
    >
      <Table stickyHeader aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>

            <StyledTableCell>Song Name</StyledTableCell>
            {props.type !== 'favorite' ? (
              <>
                <StyledTableCell align='right'>Artist</StyledTableCell>
                <StyledTableCell align='right'>Album</StyledTableCell>
                {props.suggestions ? <StyledTableCell></StyledTableCell> : ''}
              </>
            ) : (
              ''
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) =>
            props.suggestions ? (
              <Row key={row.id} row={row} dataList={dataList} index={index} />
            ) : (
              <>
                <StyledTableRow key={row.id} className={classes.normalRow}>
                  <StyledTableCell component='th' scope='row'>
                    {props.type !== 'favorite' ? (
                      <span
                        onClick={() => {
                          addFavorite(results[index]);
                        }}
                      >
                        <PlusSign color='#ff6584' />
                      </span>
                    ) : (
                      <span onClick={() => removeFavorite(row)}>
                        <MinusSign color='#ff6584' />
                      </span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  {props.type !== 'favorite' ? (
                    <>
                      <StyledTableCell align='right'>
                        {row.artist}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {row.album}
                      </StyledTableCell>
                    </>
                  ) : (
                    ''
                  )}
                </StyledTableRow>
              </>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListComponent;

const useRowStyles = makeStyles({
  collapseRow: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: 'rgba(0,0,0,.45)'
    },
    '& .MuiTableCell-root:last-child': {
      minWidth: '30px',
      width: '50px',
      lineHeight: 2
    }
  }
});

function Row(props) {
  const { row, dataList, index } = props;
  const [open, setOpen] = useState(false);
  const { addFavorite } = useContext(FavoritesContext);
  const classes = useRowStyles();

  return (
    <>
      <StyledTableRow className={classes.collapseRow}>
        <StyledTableCell component='th' scope='row'>
          <span onClick={() => addFavorite(dataList[index])}>
            <PlusSign color='#ff6584' />
          </span>
        </StyledTableCell>
        <StyledTableCell component='th' scope='row'>
          {row.name}
        </StyledTableCell>
        <StyledTableCell align='right'>{row.artist}</StyledTableCell>
        <StyledTableCell align='right'>{row.album}</StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUp /> : <ArrowDown />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Description
              </Typography>
              <RadarChart />
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
}
