import React from "react"
import ListComponent from './ListComponent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles(() => ({
    paper: {
        display: "flex",
        padding: "40px 20px 10px",
        marginTop: "-50px",
        marginBottom: "30px",
        color: "white",
        border: "1px solid #6c63FF",
        background: "rgba(0,0,0,.45)",
        "& .MuiButton-root": {
            backgroundColor: "#6C63FF",
            color: "white",
            marginLeft: "20px",
            width: "150px"
          },
        "& .MuiSlider-root" : {
            color: "#ff6584"
        }
    },
    box: {
        display: "flex",
        flexDirection: "column",
        width: "10%",
        margin: "0 30px"
    }
}))

const features = ["danceability", "energy", "mode", "speechiness", "instrumentalness", "liveness", "valence"];

const SearchMood = () => {
    const classes = useStyle();
    return (
        <>
        <Paper className={classes.paper} square>
            {features.map((features) => (
                <Box className={classes.box}>
                    <Typography id="discrete-slider" gutterBottom>
                        {features}
                    </Typography>
                    <Slider
                        defaultValue={0}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={.1}
                        marks
                        min={0}
                        max={1}
                    />
                </Box>
            ))}
            <Button size="large">Search</Button>
        </Paper>
        <ListComponent />
        </>
    );
}

export default SearchMood