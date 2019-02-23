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
    const tabTitles = wrapper.find('li[data-test="tab"]');

    const tabContentsBeforeChanges = wrapper.find('div[data-test="tab-content"]');
    expect(tabContentsBeforeChanges.at(0).children()).toExist();

    tabTitles.at(1).simulate('click');
    const tabContentsAfterChanges = wrapper.find('div[data-test="tab-content"]');

    expect(tabContentsAfterChanges.at(0).children()).not.toExist();
    expect(tabContentsAfterChanges.at(1).children()).toExist();
  });

  it('addTabs', () => {
    const wrapper = mount(<App />);
    const tabAddButton = wrapper.find('[data-test="tab-add"]');

    tabAddButton.simulate('click');

    const tabAfterChanges = wrapper.find('li[data-test="tab"]');
    expect(tabAfterChanges.at(2)).toContainMatchingElement('[aria-selected="true"]');
  });

  it('removeTabs', () => {
    const wrapper = mount(<App />);
    const tabRemoveButtons = wrapper.find('[data-test="tab-remove"]');

    tabRemoveButtons.last().simulate('click');

    expect(wrapper).toContainMatchingElements(1, 'li[data-test="tab"]');
  });
});
