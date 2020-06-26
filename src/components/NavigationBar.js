import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles(() => ({
  bar: {
    background: '#080815',
    borderBottom: '1px solid #6c63FF',
    '& .MuiButton-root': {
      backgroundColor: '#ff6584',
      color: 'white',
      marginLeft: '20px',
      '&:hover': {
        background: '#cc3b58'
      }
    }
  },
  title: {
    flexGrow: 1,
    fontSize: '1.8rem'
  }
}));

const NavigationBar = ({ setIsShowing }) => {
  const { setUserId } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    setUserId('');
    history.push('/');
  };

  return (
    <AppBar position='fixed' className={classes.bar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Spotify Suggester
        </Typography>
        <Link to="/favorites"><Button
          size='large'
          onClick={() => {
            setIsShowing('search');
          }}
        >
          Search by Song/Artist
        </Button></Link>
        <Button
          size='large'
          href='https://quizzical-goodall-28a278.netlify.app/'
          target='_blank'
        >
          About Us
        </Button>
        <Button size='large' onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
