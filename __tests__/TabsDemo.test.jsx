import delay from 'delay';
import nock from 'nock';
import fs from 'fs';
import React from 'react';
import { mount } from 'enzyme';
import App from '@/layout/App';
import ServiceContext from '@/context/ServiceContext';
import ApiService from '@/services/ApiService';
import StorageService from '@/services/StorageService';

nock.disableNetConnect();

const dataTab = 'li[data-test="tab"]';

const createSelector = wrapper => ({
  tabs: () => wrapper.find(dataTab),
  tabAt: i => wrapper.find(dataTab).at(i),
  removeButtonsTab: () => wrapper.find('[data-test="tab-remove"]'),
  addTabButton: () => wrapper.find('[data-test="tab-add"]'),
  addTabNameInput: () => wrapper.find('[data-test="tab-add-name"]'),
  addTabUrlInput: () => wrapper.find('[data-test="tab-add-url"]'),
  getDemoTabs: () => wrapper.find('[data-test="demo-tabs"]'),
  getRssTabContent: () => wrapper.find('[data-test="rss-content"]'),
});

describe('DemoTabs', () => {
  it('addTabs', () => {
    const wrapper = mount(<App />);

    const wrapperSelector = createSelector(wrapper);

    expect(wrapperSelector.getDemoTabs()).toContainMatchingElements(2, dataTab);
    wrapperSelector.addTabButton().simulate('click');

    expect(wrapperSelector.getDemoTabs()).toContainMatchingElements(3, dataTab);
  });

  it('removeTab', () => {
    const wrapper = mount(<App />);
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

  it('check create rss tab', async () => {
    const fixture = fs.readFileSync('__fixtures__/rss.xml', 'utf-8');
    nock('https://feedforall.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/sample.xml')
      .reply(200, fixture);
    const wrapper = mount(
      <ServiceContext.Provider value={{ api: ApiService, storage: StorageService }}>
        <App />
      </ServiceContext.Provider>,
    );

    const wrapperSelector = createSelector(wrapper);

    wrapperSelector.addTabNameInput().simulate('change', { target: { value: 'test1' } });
    wrapperSelector.addTabUrlInput().simulate('change', { target: { value: 'https://feedforall.com/sample.xml' } });
    wrapperSelector.addTabButton().simulate('click');
    const tab = wrapperSelector.tabAt(2);
    tab.simulate('click');
    await delay(100);
    wrapper.update();

    expect(wrapperSelector.getRssTabContent()).toHaveText(fixture);
  });
});
