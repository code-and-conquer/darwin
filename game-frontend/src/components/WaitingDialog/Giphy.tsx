import React, { FC } from 'react';

const GiphyIDs = [
  'hiu4RJvbEBUVq',
  '26gJAzOW1B7EdvWRG',
  'u5eXlkXWkrITm',
  'aqFRBqGjnznd6',
];

const Giphy: FC = () => {
  const giphyID = GiphyIDs[Math.floor(Math.random() * GiphyIDs.length)];
  const posterSrc = `https://media.giphy.com/media/${giphyID}/200_s.gif`;
  const videoSrc = `https://media.giphy.com/media/${giphyID}/giphy.mp4`;
  const altImageSrc = `https://media.giphy.com/media/${giphyID}/giphy.gif`;

  return (
    <video
      autoPlay
      poster={posterSrc}
      id="gif-mp4"
      loop
      title="Credits to Giphy"
    >
      <source
        src={videoSrc}
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      ></source>
      <img
        src={altImageSrc}
        title="Your browser does not support the mp4 video codec."
        alt="Waiting..."
      />
    </video>
  );
};

export default Giphy;
