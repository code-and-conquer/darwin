import React, { Component, FC, useState } from 'react';
import styled from 'styled-components';
import { ControlledEditorOnChange } from '@monaco-editor/react';
import { FeedbackType } from '@darwin/types';
import Tab from './Tab';
import Editor from './Editor';
import ErrorLog from './ErrorLog';
import { useFeedback } from '../../service/game';
import TabBadge from './TabBadge';

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
  name: string | JSX.Element;
  component: Component | JSX.Element;
};

type TabDefinitions = Record<string, TabDefinition>;

const Tabs: FC<{
  onEditorChange: ControlledEditorOnChange;
  saveScript: (script: string) => void;
}> = props => {
  const feedback = useFeedback();
  const errorCount = feedback.filter(fb => fb.type === FeedbackType.ERROR)
    .length;
  const tabs: TabDefinitions = {
    code: {
      name: 'Code',
      component: (
        <Editor save={props.saveScript} onChange={props.onEditorChange} />
      ),
    },
    errors: {
      name: (
        <span>
          Fehler
          {errorCount > 0 ? <TabBadge>{errorCount}</TabBadge> : null}
        </span>
      ),
      component: <ErrorLog />,
    },
  };

  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  return (
    <Container>
      {Object.keys(tabs).map(tabKey => {
        return (
          <Tab
            key={tabKey}
            className={tabKey === activeTab ? 'active' : ''}
            onClick={(): void => {
              setActiveTab(tabKey);
            }}
          >
            {tabs[tabKey].name}
          </Tab>
        );
      })}
      {Object.keys(tabs).map(tabKey => {
        return (
          <Content
            key={tabKey}
            className={activeTab === tabKey ? 'active' : ''}
          >
            {tabs[tabKey].component}
          </Content>
        );
      })}
    </Container>
  );
};
export default Tabs;
