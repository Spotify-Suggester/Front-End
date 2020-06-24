import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    bar: {
        background: "#080815",
        borderBottom: "1px solid #6c63FF",
        "& .MuiButton-root": {
            backgroundColor: "#ff6584",
            color: "white"
          }
    },
    menuButton: {
        marginRight: "2px",
    },
    title: {
        flexGrow: 1,
        fontSize: "1.8rem"
    },
  }),
);

const NavigationBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.bar}>
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                Spotify Suggestions
            </Typography>
            <Button size="large">Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar