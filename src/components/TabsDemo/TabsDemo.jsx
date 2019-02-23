// @flow

import React, { useState, useCallback } from 'react';
import debug from 'debug';
import nanoid from 'nanoid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabsDemo = () => {
  const [state, setState] = useState([nanoid(3), nanoid(3)]);
  const [activeTab, setActiveTab] = useState(0);
  const logger = debug('DemoTabs');
  const removeTab = useCallback(tabId => e => {
    e.preventDefault();
    logger(`remove tab ${tabId}`, state);
    setState(item => item.filter(tab => tab !== tabId));
  });

  const addNewTab = useCallback(() => {
    const newId = nanoid(3);
    logger(`add tab ${newId}`, state);
    setState(item => [...item, newId]);
    setActiveTab(state.length);
  });

  return (
    <div data-test="demo-tabs">
      <Tabs selectedIndex={activeTab} onSelect={(i) => setActiveTab(i)}>
        <TabList>
          {state.map(tab => (
            <Tab key={tab} data-test="tab">
              <span>Title {tab}</span>
              <button data-test="tab-remove" type="button" onClick={removeTab(tab)}>
                remove
              </button>
            </Tab>
          ))}
          <button type="button" data-test="tab-add" onClick={addNewTab}>
            add
          </button>
        </TabList>
        {state.map(tab => (
          <TabPanel key={tab} data-test="tab-content">
            <div>
              <h2>Any content {tab}</h2>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsDemo;
