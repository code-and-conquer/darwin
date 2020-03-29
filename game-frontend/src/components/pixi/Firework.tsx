import { useApp } from '@inlet/react-pixi';
import { FC, useEffect } from 'react';
import * as particles from 'pixi-particles';
import * as PIXI from 'pixi.js';
import { FIELD_SIZE, STAGE_COLUMNS, STAGE_ROWS } from '../../constants/stage';
import particleImage from './assets/particle.png';

const width = STAGE_ROWS * FIELD_SIZE;
const height = STAGE_COLUMNS * FIELD_SIZE;

function emit(
  application: PIXI.Application,
  color: string,
  x: number,
  y: number
): void {
  const emitter = new particles.Emitter(
    application.stage,
    [PIXI.Texture.from(particleImage)],
    {
      alpha: {
        start: 1,
        end: 1,
      },
      scale: {
        start: 0.1,
        end: 0.1,
        minimumScaleMultiplier: 1.05,
      },
      color: {
        start: color,
        end: color,
      },
      speed: {
        start: 200,
        end: 150,
        minimumSpeedMultiplier: 0.1,
      },
      acceleration: {
        x: 0,
        y: 200,
      },
      maxSpeed: 0,
      startRotation: {
        min: 0,
        max: 360,
      },
      noRotation: true,
      lifetime: {
        min: 1.5,
        max: 1.8,
      },
      blendMode: 'normal',
      frequency: 0.001,
      emitterLifetime: 1,
      maxParticles: 150,
      pos: {
        x,
        y,
      },
      addAtBack: false,
      spawnType: 'point',
    }
  );

  emitter.playOnceAndDestroy();
}

const Firework: FC = () => {
  const application = useApp();

  useEffect(() => {
    function spawnFirework(x: number, y: number): void {
      emit(application, '#ff3d3d', x, y);
      emit(application, '#2ec655', x, y);
      emit(application, '#092f99', x, y);
    }

    setTimeout(() => {
      spawnFirework(width / 2, height / 4);
    }, 0);
    setTimeout(() => {
      spawnFirework(width * 0.8, height / 2);
    }, 250);
    setTimeout(() => {
      spawnFirework(width / 4, height / 2);
    }, 500);
  }, [application]);

  return null;
};

export default Firework;
