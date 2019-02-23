import React from 'react';
import { mount } from 'enzyme';
import App from '@/layout/App';

describe('DemoTabs', () => {
  it('render', () => {
    const wrapper = mount(<App />);
    const demoTabs = wrapper.find('[data-test="demo-tabs"]');
    expect(demoTabs).toExist();
  });

  it('check changing tabs', () => {
    const wrapper = mount(<App />);
    const tabTitles = wrapper.find('[data-test="tab"]').hostNodes();

    const tabContentsBeforeChanges = wrapper.find('[data-test="tab-content"]').hostNodes();
    expect(tabContentsBeforeChanges.at(0).children()).toExist();

    tabTitles.at(1).simulate('click');
    const tabContentsAfterChanges = wrapper.find('[data-test="tab-content"]').hostNodes();

    expect(tabContentsAfterChanges.at(0).children()).not.toExist();
    expect(tabContentsAfterChanges.at(1).children()).toExist();
  });

  it('addTabs', () => {
    const wrapper = mount(<App />);
    const tabAddButton = wrapper.find('[data-test="tab-add"]').hostNodes();
    const tabContentLenghtBeforeChanges = wrapper.find('[data-test="tab-content"]').hostNodes().length;
    tabAddButton.simulate('click');

    const tabContentAfterChanges = wrapper.find('[data-test="tab-content"]').hostNodes();
    expect(tabContentAfterChanges).toHaveLength(tabContentLenghtBeforeChanges + 1);
  });

  it('removeTabs', () => {
    const wrapper = mount(<App />);
    const tabAddButton = wrapper.find('[data-test="tab-remove"]').hostNodes();
    const tabContentLenghtBeforeChanges = wrapper.find('[data-test="tab-content"]').hostNodes().length;
    tabAddButton.at(0).simulate('click');

    const tabContentAfterChanges = wrapper.find('[data-test="tab-content"]').hostNodes();
    expect(tabContentAfterChanges).toHaveLength(tabContentLenghtBeforeChanges - 1);
  });
});
