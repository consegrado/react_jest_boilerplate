import React from 'react';
import { mount } from 'enzyme';
import App from '@/layout/App';
import ServiceContext from '@/context/ServiceContext';

const dataTab = 'li[data-test="tab"]';

const createSelector = wrapper => ({
  tabs: () => wrapper.find(dataTab),
  tabAt: i => wrapper.find(dataTab).at(i),
  removeButtonsTab: () => wrapper.find('[data-test="tab-remove"]'),
  addButtonsTab: () => wrapper.find('[data-test="tab-add"]'),
  getDemoTabs: () => wrapper.find('[data-test="demo-tabs"]'),
});

describe('DemoTabs', () => {
  it('addTabs', () => {
    const wrapper = mount(
      <ServiceContext.Provider value={{}}>
        <App />
      </ServiceContext.Provider>,
    );

    const wrapperSelector = createSelector(wrapper);

    expect(wrapperSelector.getDemoTabs()).toContainMatchingElements(2, dataTab);
    wrapperSelector.addButtonsTab().simulate('click');

    expect(wrapperSelector.getDemoTabs()).toContainMatchingElements(3, dataTab);
  });

  it('removeTab', () => {
    const wrapper = mount(
      <ServiceContext.Provider value={{}}>
        <App />
      </ServiceContext.Provider>,
    );
    const wrapperSelector = createSelector(wrapper);

    expect(wrapperSelector.getDemoTabs()).toContainMatchingElements(2, dataTab);

    const tabRemoveButtons = wrapperSelector.removeButtonsTab();
    tabRemoveButtons.last().simulate('click');

    expect(wrapperSelector.getDemoTabs()).toContainMatchingElements(1, dataTab);
  });

  it('Check save tab to cookie', () => {
    const storageStub = () => {
      const storage = {};
      return {
        set: (field, value) => {
          storage[field] = value;
        },
        get: field => storage[field],
      };
    };
    const storage = storageStub();

    const wrapper = mount(
      <ServiceContext.Provider value={{ storage }}>
        <App />
      </ServiceContext.Provider>,
    );
    const wrapperSelector = createSelector(wrapper);
    const tab = wrapperSelector.tabAt(1);
    tab.simulate('click');

    const wrapper2 = mount(
      <ServiceContext.Provider value={{ storage }}>
        <App />
      </ServiceContext.Provider>,
    );
    const wrapperSelector2 = createSelector(wrapper2);
    const tab2 = wrapperSelector2.tabAt(1);
    expect(tab2).toHaveProp('aria-selected', 'true');
  });
});
