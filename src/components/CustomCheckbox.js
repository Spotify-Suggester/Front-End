import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";



function CustomCheckbox(props) {

  const useStyle = makeStyles(() => ({
    button: {
      
      fontSize: "4rem",
      width: "22%",
      height: "130px",
      margin: "5px 0 15px 0",
      color: "#111",
      border: "2px solid #FF6584",
      background: `linear-gradient(rgba(255,101,132,.5), rgba(255,101,132,.5)), url(${props.imageURL}) center`,
      backgroundSize: `cover`,
      fontSize: "1.2rem",
      fontWeight: "600",
      "& .MuiButton-label": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& i": {
          fontSize: "4.5rem"
        }
      }
    },
    span: {
      fontSize: "1.2rem",
      fontWeight: "500",
      
    }
  }));

  const classes = useStyle();
  return (
    <Button className={classes.button}><i className={props.fontAwesomeIcon}></i><span className={classes.span}>Rock</span></Button>
  );
}

export default CustomCheckbox;