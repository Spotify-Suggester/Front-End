import axios from 'axios';

export const axiosWithUserAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      Authorization: token
    }
  });
};

export const axiosWithSpotifyAuth = () => {
  const access_token = localStorage.getItem('access_token');

  return axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
