import React, { FC } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  background: rebeccapurple;
  color: white;
  padding: 2rem;
  width: 50vw;
  height: 50vh;
  z-index: 99;
  top: 50%;
  left: 50%;
  overflow-y: auto;
  text-align: left;
  transform: translate(-50%, -50%);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.5);
`;

const HelpDialog: FC = () => {
  return (
    <Modal>
      <h3>Ziel: Überleben!</h3>
      <h3>Der Spieler überlebt indem er:</h3>
      <ul>
        <li>
          <p>Nahrung aufsammelt damit er nicht verhungert</p>
        </li>
        <li>
          <p>Ressourcen aufsammelt um Ausrüstung oder Gebäude zu bauen</p>
        </li>
        <li>
          <p>Gegnerische Einheiten angreift</p>
        </li>
      </ul>
      <h3>Anleitung:</h3>
      <ul>
        <li>
          <h4>Match ausschreiben:</h4>
        </li>
        <li>
          <p>blax Code eingeben.</p>
        </li>
      </ul>
      <ul>
        <li>
          <h4>Match beitreten:</h4>
        </li>
        <li>
          <p>xalb Code eingeben.</p>
        </li>
        <li>
          <h4>Match mitverfolgen:</h4>
        </li>
        <li>
          <p>axbl Code eingeben.</p>
        </li>
        <li>
          <h4>Match steuern mittels code:</h4>
        </li>
        <li>
          <p>lbxa Code eingeben.</p>
        </li>
        <li>
          <h4>Diese Hilfe anzeigen:</h4>
        </li>
        <li>
          <p>help eingeben.</p>
        </li>
      </ul>
      <h3>Strategie Tipps:</h3>
      <ul>
        <li>Noch unbekannt.</li>
      </ul>
    </Modal>
  );
};

export default HelpDialog;
