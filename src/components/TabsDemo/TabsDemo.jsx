// @flow

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabsDemo = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>
          <span data-test-name="tab">Title 1</span>
        </Tab>
        <Tab>
          <span data-test-name="tab">Title 2</span>
        </Tab>
      </TabList>

      <TabPanel>
        <div data-test-name="tab-content">
          <h2>Any content 1</h2>
        </div>
      </TabPanel>
      <TabPanel>
        <div data-test-name="tab-content">
          <h2>Any content 2</h2>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default TabsDemo;
