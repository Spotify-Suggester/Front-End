
import React from 'react';

const PlayButton = ({ size = '20px', color = 'white' }) => (
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
        d="M14.5195 9.29688L7.64453 5.11719C7.02734 4.77344 6.25 5.21484 6.25 5.9375V14.0625C6.25 14.7812 7.02344 15.2266 7.64453 14.8828L14.5195 10.9375C15.1602 10.582 15.1602 9.65625 14.5195 9.29688ZM19.6875 10C19.6875 4.64844 15.3516 0.3125 10 0.3125C4.64844 0.3125 0.3125 4.64844 0.3125 10C0.3125 15.3516 4.64844 19.6875 10 19.6875C15.3516 19.6875 19.6875 15.3516 19.6875 10ZM2.1875 10C2.1875 5.68359 5.68359 2.1875 10 2.1875C14.3164 2.1875 17.8125 5.68359 17.8125 10C17.8125 14.3164 14.3164 17.8125 10 17.8125C5.68359 17.8125 2.1875 14.3164 2.1875 10Z" 
        fill={color}
    />
  </svg>
);

export default PlayButton;
















