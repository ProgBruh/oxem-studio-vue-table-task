const axios = require('axios');

export default class DataSerice {
  static getDataList(mode) {
    const url =
      mode === 'short' ? process.env.SHORT_API_URL : process.env.LONG_API_URL;
    return axios.get(url);
  }
}
