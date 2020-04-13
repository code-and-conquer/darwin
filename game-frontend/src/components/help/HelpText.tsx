import React, { FC } from 'react';
import InlineCode from './InlineCode';
import Codeblock from './CodeBlock';
import CostEmoji from './CostEmoji';
import PowerUp from '../canvas-objects/Powerup';
import OneFieldStage from './OneFieldStage';

const moveToFoodCodeExample = `
if(nearestFood.position.x > userUnit.position.x){
  move('RIGHT');
} else if (nearestFood.position.x < userUnit.position.x){
  move('LEFT');
}
`;

const storeCodeExample = `
if (typeof store.timesMovedLeft === 'undefined') {
    store.timesMovedLeft = 0;
}
if (store.timesMovedLeft < 3) {
    move("LEFT");
    store.timesMovedLeft++;
} else {
    move("RIGHT");
}
`;

const HelpText: FC = () => {
  return (
    <>
      <h2>Hilfe</h2>
      <p>Ziel des Spiel ist es, am längsten zu überleben.</p>
      <h3>Spielfiguren</h3>
      <h4>Unit</h4>
      <p>
        Die grün markierte <InlineCode>Unit</InlineCode> ist deine Figur, mit
        welcher du dich ins Abenteuer stürzst. Ziel ist es, durch Aufsammeln von
        Ressourcen und Attackieren von Gegnern (rot markiert) der letzte
        Überlebende zu sein.
      </p>
      <h3>API</h3>
      <h4>Zwischenspeicher</h4>
      <p>
        Mittels der <InlineCode>store</InlineCode> Variable kannst du berechnete
        Resultate über verschiedene Runden hinweg speichern.
      </p>
      <Codeblock>{storeCodeExample}</Codeblock>
      <h4>Aktionspunkte</h4>
      <p>
        Jeder Befehl kostet Aktionspunkte. Pro Runde hast du 3 Aktionspunkte.
        Bei jedem Befehl steht wieviel eine Ausführung kostet (z.B.:{' '}
        <CostEmoji /> 1).
      </p>
      <h4>
        Bewegen - <CostEmoji /> 1
      </h4>
      <p>
        Um deine <InlineCode>Unit</InlineCode> zu Bewegen, steht dir die{' '}
        <InlineCode>move</InlineCode>
        -Funktion mit den vier Richtungen (<InlineCode>'UP'</InlineCode>,
        <InlineCode>'RIGHT'</InlineCode>,<InlineCode>'DOWN'</InlineCode>,
        <InlineCode>'LEFT'</InlineCode>) zur Verfügung.
      </p>
      <Codeblock>move('UP')</Codeblock>
      <h4>
        Ressourcen konsumieren - <CostEmoji /> 3
      </h4>
      <p>
        Die Positionen der Ressourcen kannst du mithilfe der Variable{' '}
        <InlineCode>foods</InlineCode> auslesen. In der Variable{' '}
        <InlineCode>nearestFood</InlineCode> findest du die Food-Ressource,
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
      <h4>Power-ups</h4>
      <p>
        Mit dem Konsumieren eines Powerups kann sich der Spieler einen Vorteil
        verschaffen und die Fähigkeiten seiner Unit verstärken.
      </p>
      <ul>
        <li>
          <p>
            Teleport:{' '}
            <OneFieldStage>
              <PowerUp color={0xffc0cb} position={{ x: 0, y: 0 }}></PowerUp>
            </OneFieldStage>
          </p>
          Teleportiert die Unit auf ein zufälliges anderes freies Feld.
        </li>
        <li>
          <p style={{ color: `#d7ff9e` }}> Health Regeneration: </p>
          Konsumieren von Ressourcen hat einen stärkeren Effekt
        </li>
        <li>
          <p style={{ color: `#05bf96` }}> Endurance: </p> Die Unit verliert
          weniger Leben pro Tick
        </li>
      </ul>
    </>
  );
};

export default HelpText;
