import React, { FC, useState, Component } from 'react';
import styled from 'styled-components';
import { ControlledEditorOnChange } from '@monaco-editor/react';
import Tab from './Tab';
import Editor from './Editor';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  color: #d4d4d4;
  background: #202124;
  width: 100%;
  height: 100%;
  display: none;

  &.active {
    display: block;
  }
`;

type TabDefinition = {
  name: string;
  component: Component | JSX.Element;
};

type TabDefinitions = Record<string, TabDefinition>;

const Tabs: FC<{
  onEditorChange: ControlledEditorOnChange;
  saveScript: (script: string) => void;
}> = props => {
  const tabs: TabDefinitions = {
    code: {
      name: 'Code',
      component: (
        <Editor save={props.saveScript} onChange={props.onEditorChange} />
      ),
    },
    errors: {
      name: 'Fehler',
      component: <div>Gugus</div>,
    },
  };

  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  return (
    <Container>
      {Object.keys(tabs).map(tabKey => {
        return (
          <>
            <Tab
              key={tabKey}
              className={tabKey === activeTab ? 'active' : ''}
              onClick={(): void => {
                setActiveTab(tabKey);
              }}
            >
              {tabs[tabKey].name}
            </Tab>
          </>
        );
      })}
      {Object.keys(tabs).map(tabKey => {
        return (
          <Content className={activeTab === tabKey ? 'active' : ''}>
            {tabs[tabKey].component}
          </Content>
        );
      })}
    </Container>
  );
};
export default Tabs;
