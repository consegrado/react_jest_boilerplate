// @flow

import React, { useState, useCallback, useMemo, useContext } from 'react';
import { isNil } from 'ramda';
import ServiceContext from '@/context/ServiceContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CreateTab from '@/components/CreateTab';
import RssTab from '@/components/RssTab';
import useTabs from '@/hooks/useTabs.hook';
import 'react-tabs/style/react-tabs.css';

const TabsDemo = () => {
  const { storage } = useContext(ServiceContext);
  const { state, removeTab, addNewTab } = useTabs(storage);

  const initialActiveTab = useMemo(() => {
    return (!isNil(storage) && Number(storage.get('demoTabIndex'))) || 0;
  });

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const changeTab = useCallback(indexTab => {
    setActiveTab(indexTab);
    storage.set('demoTabIndex', indexTab);
  });

  return (
    <div data-test="demo-tabs">
      <CreateTab addNewTab={addNewTab} />
      <Tabs selectedIndex={activeTab} onSelect={i => changeTab(i)}>
        <TabList>
          {state.map(tab => (
            <Tab key={tab.id} data-test="tab">
              <span>{tab.name}</span>
              <button data-test="tab-remove" type="button" onClick={removeTab(tab.id)}>
                remove
              </button>
            </Tab>
          ))}
        </TabList>
        {state.map(tab => (
          <TabPanel key={tab.id} data-test="tab-content">
            <div>
              <h2>
                {tab.type === 'default' && (
                  <div>
                    Any content {tab.type} {tab.id}
                  </div>
                )}
                {tab.type === 'rss' && <RssTab url={tab.url} />}
              </h2>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsDemo;
