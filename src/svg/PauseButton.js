
import React from 'react';

const PauseButton = ({ size = '20px', color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
        fillRule='evenodd'
        clip-rule="evenodd" 
        d="M10 0.3125C4.64844 0.3125 0.3125 4.64844 0.3125 10C0.3125 15.3516 4.64844 19.6875 10 19.6875C15.3516 19.6875 19.6875 15.3516 19.6875 10C19.6875 4.64844 15.3516 0.3125 10 0.3125ZM10 17.8125C5.68359 17.8125 2.1875 14.3164 2.1875 10C2.1875 5.68359 5.68359 2.1875 10 2.1875C14.3164 2.1875 17.8125 5.68359 17.8125 10C17.8125 14.3164 14.3164 17.8125 10 17.8125ZM13.75 6.875V13.125C13.75 13.4688 13.4688 13.75 13.125 13.75H11.25C10.9062 13.75 10.625 13.4688 10.625 13.125V6.875C10.625 6.53125 10.9062 6.25 11.25 6.25H13.125C13.4688 6.25 13.75 6.53125 13.75 6.875ZM9.375 6.875V13.125C9.375 13.4688 9.09375 13.75 8.75 13.75H6.875C6.53125 13.75 6.25 13.4688 6.25 13.125V6.875C6.25 6.53125 6.53125 6.25 6.875 6.25H8.75C9.09375 6.25 9.375 6.53125 9.375 6.875Z"
        fill={color}
    />
  </svg>
);

export default PauseButton;
