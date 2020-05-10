import React, { FC, useEffect } from 'react';
import { Console as ConsoleFeed } from 'console-feed';
import { Methods } from 'console-feed/lib/definitions/Console';
import { FeedbackType } from '@darwin/types';
import { useFeedback } from '../../service/game';
import { useErrorSound } from '../../service/sound';
import ConsoleContainer from './ConsoleContainer';

const mapFeedbackTypeToMethod = (type: FeedbackType): Methods => {
  switch (type) {
    case FeedbackType.ERROR:
      return 'error';
    case FeedbackType.INFO:
      return 'info';
    default:
      throw Error('unknown FeedbackType mapping');
  }
};

const Console: FC = () => {
  const feedback = useFeedback();
  const playErrorSound = useErrorSound();
  const logs = feedback.map(entry => ({
    method: mapFeedbackTypeToMethod(entry.type),
    data: entry.content,
  }));
  useEffect(() => {
    const errorLogCount = feedback.filter(fb => fb.type === FeedbackType.ERROR)
      .length;
    const hasFirstErrorLog = errorLogCount === 1;
    if (hasFirstErrorLog) {
      playErrorSound();
    }
  }, [feedback, playErrorSound]);
  return (
    <ConsoleContainer>
      <ConsoleFeed logs={logs as never} variant="dark" />
    </ConsoleContainer>
  );
};
export default Console;
