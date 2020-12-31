import axios from 'axios';
import moment from 'moment-mini';

const uiFacesAPIkey = '7BA2BCAE-BE194E10-934EA95C-12CAA2AB';

const api = {
  signup: async function (info) {
    return new Promise(async (resolve, reject) => {
      // There's no backend, so just using dummy data for now
      const user = {
        ...info,
      };
      const token = 'SKJFJ293U92323023902382NG2G2';
      try {
        setTimeout(() => {
          resolve({ user, token });
        }, 2000);
      } catch (err) {
        reject(err);
      }
    });
  },
  login: async function (info) {
    return new Promise(async (resolve, reject) => {
      // There's no backend, so just using dummy data for now
      try {
        setTimeout(() => {
          const token = 'SKJFJ293U92323023902382NG2G2';
          resolve({ token });
        }, 2000);
      } catch (err) {
        reject(err);
      }
    });
  },
  getTransactions: async function () {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'https://uifaces.co/api?limit=10',
          headers: {
            'X-API-KEY': uiFacesAPIkey,
          },
        });

        const transactions = data.map((item, idx) => {
          const { name, photo } = item;
          return {
            name,
            imageUrl: photo,
            amount: (idx + 1) * Math.ceil(Math.random() * Math.floor(9)),
            date: moment().subtract(idx, 'days').calendar(),
            id: idx,
          };
        });
        resolve(transactions);
      } catch (err) {
        reject(err);
      }
    });
  },
};

export default api;
