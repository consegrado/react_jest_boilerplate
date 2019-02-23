// @flow

import React, { useState, useCallback } from 'react';
import debug from 'debug';
import nanoid from 'nanoid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabsDemo = () => {
  const [state, setState] = useState([nanoid(), nanoid()]);
  const logger = debug('DemoTabs');
  const removeTab = useCallback(tabId => e => {
    e.preventDefault();
    logger(`remove tab ${tabId}`, state);
    setState(item => item.filter(tab => tab !== tabId));
  });

  const addNewTab = useCallback(() => {
    const newId = nanoid();
    logger(`add tab ${newId}`, state);
    setState(item => [...item, nanoid()]);
  });

  return (
    <div data-test="demo-tabs">
      <Tabs>
        <TabList>
          {state.map((tab, i) => (
            <Tab key={tab}>
              <span data-test="tab">Title {i}</span>
              <button data-test="tab-remove" type="button" onClick={removeTab(tab)}>
                remove
              </button>
            </Tab>
          ))}
          <button type="button" data-test="tab-add" onClick={addNewTab}>
            add
          </button>
        </TabList>
        {state.map((tab, i) => (
          <TabPanel key={tab} data-test="tab-content">
            <div>
              <h2>Any content {i}</h2>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsDemo;
