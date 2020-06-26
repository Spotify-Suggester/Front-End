// User can request suggested songs based on what they are in the mood for ( acousticness, danceability, duration, energy, etc)
import React from 'react';
import ListComponent from './ListComponent';

const suggestion = [
  {
    id: "asd",
    name: "asddd",
    artists: [
      {
        name:"Pepito"
      }
    ],
    album: {
      name: "asdad"
    }
  },
  {
    id: "asd",
    name: "Miasidn",
    artists: [
      {
        name:"bad Bunny"
      }
    ],
    album: {
      name: "asdaasdasdd"
    }
  },
  {
    id: "asd",
    name: "oiuoskl",
    artists: [
      {
        name:"Kesha"
      }
    ],
    album: {
      name: "asdad223"
    }
  }
]

const SuggestionList = () => {
  return (
    <>
      <h2 style={{fontWeight: 300, marginBottom: "30px"}}>Suggestions List</h2>
      <ListComponent  type="suggestions"/>
    </>
    );
};

export default SuggestionList;
