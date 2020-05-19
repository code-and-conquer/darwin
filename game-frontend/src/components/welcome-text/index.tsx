import React, { FC } from 'react';
import { Role } from '@darwin/types';
import Container from './Container';
import ButtonContainer from './ButtonContainer';
import RoleSwitchButton from '../role-switch/RoleSwitchButton';

const WelcomeText: FC = () => {
  return (
    <Container>
      <h2>Willkommen zu Darwin!</h2>
      <p>Möchtest du beim nächsten Spiel zuschauen oder direkt mitspielen?</p>
      <ButtonContainer>
        <RoleSwitchButton roleToRequest={Role.PLAYER}>Spielen</RoleSwitchButton>
        <RoleSwitchButton roleToRequest={Role.SPECTATOR}>
          Zuschauen
        </RoleSwitchButton>
      </ButtonContainer>
    </Container>
  );
};

export default WelcomeText;
