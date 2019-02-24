// @flow

import axios from 'axios';

export default {
  getRss: async (url: string) => {
    try {
      const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`);
      return data;
    } catch (e) {
      return null;
    }
  },
};
