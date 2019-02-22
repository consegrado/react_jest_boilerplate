// @flow

import React from 'react';
import App from '@/layout/App';
import { mount } from 'enzyme';

describe('App', () => {
  it('render', () => {
    const wrapper = mount(<App />);
    const tabLast = wrapper.find('[data-test-name="tab"]').last();
    tabLast.simulate('click');
    const tabContentLast = wrapper.find('[data-test-name="tab-content"]').last();

    expect(tabContentLast).toMatchSnapshot();
  });
});

//
// describe('check the possibility of changing tabs', () => {
//   it('check for lack of content tab2 before changing', () => {
//     const wrapper = mount(<TabsDemo />);
//     const tabContets = wrapper.find('[role="tabpanel"]');
//     expect(tabContets.filterWhere(n => n.text() === 'Any content 2')).toHaveLength(0);
//   });
//
//   it('check for the presence of content tab2 after changing', () => {
//     const wrapper = mount(<TabsDemo />);
//     const tabTitles = wrapper.find('[role="tab"]');
//     const tabContets = wrapper.find('[role="tabpanel"]');
//     tabTitles.filterWhere(n => n.text() === 'Title 2').simulate('click');
//     expect(tabContets.filterWhere(n => n.text() === 'Any content 2')).toHaveLength(1);
//   });
// });
