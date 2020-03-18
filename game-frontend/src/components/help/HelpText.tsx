import React, { FC } from 'react';
import InlineCode from './InlineCode';
import Codeblock from './CodeBlock';

const HelpText: FC = () => {
  return (
    <>
      <h2>Hilfe</h2>
      <p>Ziel des Spiel ist es, am längsten zu Überleben.</p>
      <h4>API</h4>
      <h3>Unit</h3>
      <p>
        Die <InlineCode>Unit</InlineCode> ist deine Figur, mit welcher du dich
        ins Abenteuer stürzst.
      </p>
      <h4>Bewegen</h4>
      <p>
        Um deine <InlineCode>Unit</InlineCode> zu Bewegen, steht dir die{' '}
        <InlineCode>move</InlineCode>
        -Funktion mit den vier Himmelsrichtungen (<InlineCode>'UP'</InlineCode>,
        <InlineCode>'RIGHT'</InlineCode>,<InlineCode>'DOWN'</InlineCode>,
        <InlineCode>'LEFT'</InlineCode>) zur Verfügung.
      </p>
      <Codeblock>move('UP')</Codeblock>
    </>
  );
};

export default HelpText;
