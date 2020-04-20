import React, { FC, useState, useEffect } from 'react';
import { Hook, Console, Decode } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Console';

const ErrorLog: FC = () => {
  const [logs, setLogs] = useState<Message[]>([]);

  useEffect(() => {
    Hook(window.console, log => {
      setLogs([...logs, Decode(log)]);
    });
  }, [logs]);

  return (
    <div style={{ backgroundColor: '#242424' }}>
      <Console logs={logs as never} variant="dark" />
    </div>
  );
};
export default ErrorLog;
