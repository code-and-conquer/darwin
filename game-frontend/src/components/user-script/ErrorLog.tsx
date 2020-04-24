import React, { FC } from 'react';
import { Console } from 'console-feed';
import { Methods } from 'console-feed/lib/definitions/Console';
import { FeedbackType } from '@darwin/types';
import { useFeedback } from '../../service/game';

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
  const logs = feedback.map(entry => ({
    method: mapFeedbackTypeToMethod(entry.type),
    data: entry.content,
  }));
  return (
    <div style={{ backgroundColor: '#242424' }}>
      <Console logs={logs as never} variant="dark" />
    </div>
  );
};
export default ErrorLog;
