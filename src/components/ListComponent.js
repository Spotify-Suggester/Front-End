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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';
import ArrowDown from '../svg/ArrowDown';
import Grid from '@material-ui/core/Grid';
import ArrowUp from '../svg/ArrowUp';
import RadarChart from './RadarChart';

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

function createData(id, name, artist, album, image_url) {
  return { id, name, artist, album, image_url };
}

const useStyle = makeStyles(() => ({
  normal: {
    overflowY: 'hidden'
  },
  container: {
    maxHeight: '80%',
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
    if (props.type === 'suggestions') {
      dataList = suggestions;
    } else {
      dataList = results;
    }
  }

  const classes = useStyle();

  const rows = dataList.map((result) => {
    return createData(
      result.id,
      result.name,
      result.artist,
      result.album,
      result.image_url
    );
  });

  return (
    <TableContainer
      className={props.type === 'favorite' ? classes.container : classes.normal}
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
                {props.type === 'suggestions' ? (
                  <StyledTableCell></StyledTableCell>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) =>
            props.type === 'suggestions' ? (
              <Row key={row.id} row={row} dataList={dataList} index={index} />
            ) : (
              <>
                <StyledTableRow key={row.id} className={classes.normalRow}>
                  <StyledTableCell component='th' scope='row'>
                    {props.type !== 'favorite' ? (
                      <span
                        onClick={() => {
                          addFavorite(dataList[index]);
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
  },
  extraInfo: {
    '& .MuiBox-root': {
      paddingTop: '20px',
      paddingBottom: '20px'
    },
    '& .MuiTypography-subtitle2': {
      textAlign: 'center'
    },
    '& .MuiTypography-subtitle1': {
      paddingLeft: '15px'
    },
    '& .MuiList-root': {
      display: 'flex',
      flexWrap: 'wrap',
      '& .MuiListItem-root': {
        width: '50%',
        borderTop: '1px solid white'
      },
      '& .MuiListItemText-multiline': {
        marginBottom: 0,
        marginTop: 0
      },
      '& .song': {
        color: '#6C63FF',
        marginRight: '10px'
      },
      '& .total': {
        color: '#ff6584'
      }
    },
    '& .apexcharts-legend': {
      bottom: '40px !important'
    }
  },
  gridMiddle: {
    borderLeft: '1px solid #6C63FF',
    marginLeft: '20px',
    marginRight: '-40px',
    paddingLeft: '20px'
  },
  gridPicture: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '90%'
    }
  }
});

function Row(props) {
  const { row, dataList, index } = props;
  const [open, setOpen] = useState(false);
  const {
    favorites,
    setFavorites,
    results,
    addFavorite,
    favAverages
  } = useContext(FavoritesContext);
  const classes = useRowStyles();
  console.log(dataList[index]);
  let features = [
    'danceability',
    'energy',
    'liveness',
    'loudness',
    'speechiness',
    'valence',
    'tempo',
    'instrumentalness'
  ];

  console.log('favAverages', favAverages);

  return (
    <>
      <StyledTableRow className={classes.collapseRow}>
        <StyledTableCell component='th' scope='row'>
          <span
            onClick={() => {
              addFavorite(dataList[index]);
            }}
          >
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
      <TableRow className={classes.extraInfo}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Grid container>
                <Grid item xs={2} className={classes.gridPicture}>
                  <img src={row.image_url} alt={`Album: ${row.album}`} />
                </Grid>
                <Grid item xs={4} className={classes.gridMiddle}>
                  <Typography variant='subtitle1' component='div'>
                    Features
                  </Typography>
                  <List>
                    {features.map((el, i) => (
                      <ListItem>
                        <ListItemText
                          primary={el}
                          secondary={
                            <>
                              <span className='song'>
                                {dataList[index][el].toFixed(3)}
                              </span>
                              <span className='total'>
                                {favAverages[i].value === 0
                                  ? 0
                                  : favAverages[i].value.toFixed(3)}
                              </span>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <RadarChart />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
}
