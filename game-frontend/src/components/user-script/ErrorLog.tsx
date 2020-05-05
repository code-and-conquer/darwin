import React, { FC, useEffect } from 'react';
import { Console } from 'console-feed';
import { Methods } from 'console-feed/lib/definitions/Console';
import { FeedbackType } from '@darwin/types';
import { useFeedback } from '../../service/game';
import { useErrorSound } from '../../service/sound';

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

const ErrorLog: FC = () => {
  const feedback = useFeedback();
  const playErrorSound = useErrorSound();
  const logs = feedback.map(entry => ({
    method: mapFeedbackTypeToMethod(entry.type),
    data: entry.content,
  }));
  useEffect(() => {
    const hasFirstLogEntries = logs.length === 2;
    if (hasFirstLogEntries) {
      playErrorSound();
    }
  }, [logs.length, playErrorSound]);
  return (
    <div style={{ backgroundColor: '#242424' }}>
      <Console logs={logs as never} variant="dark" />
    </div>
  );
};
export default ErrorLog;
