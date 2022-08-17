import dayjs from 'dayjs';
import misc from './misc';
import { PTY_CONTENTS, PTY_NULL_TYPE, SKY_CONTENTS } from '~/constants/weather';

const isBaseTime = ['02', '05', '08', '11', '14', '17', '20', '23'];
const isBaseTimePlus1Hour = ['03', '06', '09', '12', '15', '18', '21', '00'];
const isBaseTimePlus2Hour = ['04', '07', '10', '13', '16', '19', '22', '01'];

interface GetWeather {
  url: string;
  apiKey: string;
  nx: number;
  ny: number;
}

interface Item {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

const getBaseTime = () => {
  const curTime = new Date();
  const baseTime = [dayjs(curTime).format('YYYYMMDD')];
  const baseHour = dayjs(curTime).format('HH');

  if (isBaseTime.indexOf(baseHour) !== -1) baseTime.push(baseHour);
  else if (isBaseTimePlus1Hour.indexOf(baseHour) !== -1)
    baseTime.push(isBaseTime[isBaseTimePlus1Hour.indexOf(baseHour)]);
  else if (isBaseTimePlus2Hour.indexOf(baseHour) !== -1)
    baseTime.push(isBaseTime[isBaseTimePlus2Hour.indexOf(baseHour)]);

  return baseTime;
};

const getFcstValueOfUniqueItem = (items: Item[], category: string) =>
  items[items.findIndex((item) => item.category === category)].fcstValue;

const getPtyOrSkyOfItems = (items: Item[]) => {
  if (getFcstValueOfUniqueItem(items, 'PTY') === PTY_NULL_TYPE)
    return SKY_CONTENTS[parseInt(getFcstValueOfUniqueItem(items, 'SKY'))];
  return PTY_CONTENTS[parseInt(getFcstValueOfUniqueItem(items, 'PTY'))];
};

const weatherService = {
  getWeather: async ({ url, apiKey, nx, ny }: GetWeather) => {
    const [baseDate, baseHour] = getBaseTime();

    try {
      const res = await fetch(
        `${url}?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${baseDate}&base_time=${
          baseHour + '00'
        }&nx=${nx}&ny=${ny}&dataType=JSON`
      );

      const data = await res.json();

      if (data.response.header.resultCode !== '00')
        throw misc.getErrorMessage(data.response.header.resultMsg);

      const weather = getPtyOrSkyOfItems(data.response.body.items.item);

      return weather;
    } catch (error) {
      misc.getErrorMessage(error);
    }
  },
};

export default weatherService;