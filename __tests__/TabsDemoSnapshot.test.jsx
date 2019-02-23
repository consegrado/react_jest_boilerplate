// @flow

import React from 'react';
import App from '@/layout/App';
import { mount } from 'enzyme';

describe('App', () => {
  it('render', () => {
    const wrapper = mount(<App />);
    expect(wrapper.render()).toMatchSnapshot();
    const tabLast = wrapper.find('[data-test="tab"]').last();
    tabLast.simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });
});
