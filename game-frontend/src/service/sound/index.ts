import { useCallback } from 'react';

const buildSoundEffectHook = (audioFile: string) => {
  return (): (() => void) => {
    return useCallback((): void => {
      const audioElement = new Audio(audioFile);
      audioElement.play().catch(() => {
        // do nothing as this might occur frequently due to the way Audio API is working
      });
    }, []);
  };
};

export const useStartSound = buildSoundEffectHook('assets/audio/start.mp3');

export const useErrorSound = buildSoundEffectHook('assets/audio/error.mp3');

export const useWinningSound = buildSoundEffectHook('assets/audio/winning.mp3');

export const useLosingSound = buildSoundEffectHook('assets/audio/lose.mp3');
