import React, { FC } from 'react';
import InlineCode from './InlineCode';
import Codeblock from './CodeBlock';
import CostEmoji from './CostEmoji';

const moveToFoodCodeExample = `
if(nearestFood.position.x > userUnit.position.x){
  move('RIGHT');
} else if (nearestFood.position.x < userUnit.position.x){
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
      <h4>Aktionspunkte</h4>
      <p>
        Jeder Befehl kostet Aktionspunkte. Pro Runde hast du 3 Aktionspunkte.
        Bei jedem Befehl steht wieviel eine Ausführung kostet (z.B.:{' '}
        <CostEmoji /> 1).
      </p>
      <h4>
        Bewegen | <CostEmoji /> 1
      </h4>
      <p>
        Um deine <InlineCode>Unit</InlineCode> zu Bewegen, steht dir die{' '}
        <InlineCode>move</InlineCode>
        -Funktion mit den vier Himmelsrichtungen (<InlineCode>'UP'</InlineCode>,
        <InlineCode>'RIGHT'</InlineCode>,<InlineCode>'DOWN'</InlineCode>,
        <InlineCode>'LEFT'</InlineCode>) zur Verfügung.
      </p>
      <Codeblock>move('UP')</Codeblock>
      <h4>
        Ressouren konsumieren | <CostEmoji /> 3
      </h4>
      <p>
        Die Positionen der Ressourcen kannst du mithilfe der Variable{' '}
        <InlineCode>foods</InlineCode> auslesen. In der Variable{' '}
        <InlineCode>nearestFood</InlineCode> findest du die Food-Resource,
        welche am nächsten bei deiner Unit ist. Deine eigene Position ist in der
        Variable <InlineCode>userUnit</InlineCode> verfügbar. Beispielsweise
        kannst du deine Unit mit diesem Code an die X-Position einer Ressource
        bewegen:
      </p>
      <Codeblock>{moveToFoodCodeExample}</Codeblock>
      <p>
        Um die Ressource an deiner Position zu konsumieren, führe{' '}
        <InlineCode>consume()</InlineCode> aus.
      </p>
      <h4>Attackieren</h4>
      <p>
        Die Positionen deiner Feinde kannst du mithilfe der Variable{' '}
        <InlineCode>enemyUnits</InlineCode> auslesen. In der Variable{' '}
        <InlineCode>nearestEnemyUnit</InlineCode> findest du den Feind, welcher
        am nächsten bei deiner Unit ist. Durch einen ähnlichen Code wie beim
        Beispiel wie man sich zu einer Food-Ressource bewegen kann, kannst du
        dich auch einem Feind nähern.
      </p>
    </>
  );
};

export default HelpText;
