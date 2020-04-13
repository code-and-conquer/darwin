import React, { FC } from 'react';
import styled from 'styled-components';
import { Stage } from '@inlet/react-pixi';
import { FIELD_SIZE } from '../../constants/stage';

const Container = styled.div`
  vertical-align: middle;
  display: inline-block;
  width: ${FIELD_SIZE / 2}px;
  height: ${FIELD_SIZE / 2}px;

  canvas {
    width: inherit;
    height: inherit;
  }
`;

const OneFieldStage: FC = ({ children }) => (
  <Container>
    <Stage
      width={FIELD_SIZE}
      height={FIELD_SIZE}
      options={{ backgroundColor: 0xffffff }}
    >
      {children}
    </Stage>
  </Container>
);

export default OneFieldStage;
