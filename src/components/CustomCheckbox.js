import React from 'react';




function CustomCheckbox(props) {

  const buttonStyle = {
    background: `linear-gradient(rgba(255,101,132,.3), rgba(255,101,132,.3)), url(${props.imageURL}) center`,
    backgroundSize: `cover`,
  }
  return (
    <button style={buttonStyle}><i className={props.fontAwesomeIcon}></i><span>Rock</span></button>
  );
}

export default CustomCheckbox;