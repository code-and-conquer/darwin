import React, { FC } from 'react';
import InlineCode from './InlineCode';
import Codeblock from './CodeBlock';

const moveToFoodCodeExample = `
if(foods[0].position.x > userUnit.position.x){
  move('RIGHT');
} else if (foods[0].position.x < userUnit.position.x){
  move('LEFT');
}
`;

const HelpText: FC = () => {
  return (
    <>
      <h2>Hilfe</h2>
      <p>Ziel des Spiel ist es, am längsten zu Überleben.</p>
      <h3>API</h3>
      <h4>Unit</h4>
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
      <h4>Ressouren konsumieren</h4>
      <p>
        Die Positionen der Ressourcen kannst du mithilfe der Variable{' '}
        <InlineCode>foods</InlineCode> auslesen. Deine eigene Position ist in
        der Variable <InlineCode>userUnit</InlineCode> verfügbar. Beispielsweise
        kannst du deine Unit mit diesem Code an die X-Position einer Ressource
        bewegen:
        <Codeblock>{moveToFoodCodeExample}</Codeblock>
      </p>
    </>
  );
};

export default HelpText;
