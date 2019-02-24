// @flow

import axios from 'axios';

export default {
  getRss: async (url: string) => {
    try {
      const { data } = await axios.get(`${url}`);
      return data;
    } catch (e) {
      return null;
    }
  },
};
