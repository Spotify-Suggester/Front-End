import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { UserContext } from '../contexts/UserContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlusSign from '../svg/PlusSign';
import MinusSign from '../svg/MinusSign';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';

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
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(0,0,0,.45)'
    }
  }
}))(TableRow);

function createData(id, name, artist, year) {
  return { id, name, artist, year };
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
  }
}));

function ListComponent(props) {
  const { favorites, setFavorites, results } = useContext(FavoritesContext);
  const { userId } = useContext(UserContext);

  let dataList = [];
  if (props.type === 'favorite') {
    dataList = favorites;
  } else {
    dataList = results;
  }

  const classes = useStyle();

  const rows = dataList.map((result) => {
    return createData(result.id, result.name, result.artists[0].name, 2000);
  });

  const addFavorite = (song) => {
    if (!favorites.includes(song)) {
      setFavorites([...favorites, song]);
      axiosWithUserAuth()
        .post(
          `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`,
          { song_id: song.id }
        )
        .then((res) => console.log('post response', res))
        .catch((err) => console.error('post error', err.message));
    }
  };

  const removeFavorite = (song) => {
    setFavorites(favorites.filter((item) => item.id != song.id));
    axiosWithUserAuth()
      .delete(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites/${song.id}`
      )
      .then((res) => console.log('delete response', res))
      .catch((err) => console.error('delete error', err));
  };

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
                <StyledTableCell align='right'>Year</StyledTableCell>
              </>
            ) : (
              ''
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
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
                  <StyledTableCell align='right'>{row.artist}</StyledTableCell>
                  <StyledTableCell align='right'>{row.year}</StyledTableCell>
                </>
              ) : (
                ''
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListComponent;
