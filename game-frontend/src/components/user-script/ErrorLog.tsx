import React, { FC, useState } from 'react';
import { Console } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Console';

const ErrorLog: FC = () => {
  const [logs] = useState<Message[]>([]);

  return (
    <div style={{ backgroundColor: '#242424' }}>
      <Console logs={logs as never} variant="dark" />
    </div>
  );
};
export default ErrorLog;
