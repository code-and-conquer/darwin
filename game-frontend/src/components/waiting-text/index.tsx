import React, { FC } from 'react';
import Giphy from './Giphy';

const WaitingText: FC = () => {
  return (
    <>
      <h2>Warten auf Gegner</h2>
      <Giphy />
      <p>
        Leider traut sich gerade niemand zu, gegen Dich zu spielen.
        <span role="img" aria-label="Sad Emoji">
          😥
        </span>
        <br />
        Du musst dich ein wenig gedulden.
        <br />
        <br />
        Du kannst allerdings in der Zwischenzeit die Spielanleitung durchlesen.
      </p>
    </>
  );
};

export default WaitingText;
