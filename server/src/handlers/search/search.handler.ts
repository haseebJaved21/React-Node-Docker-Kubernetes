// @egenieNext
import express from 'express'
import { errorResponse, successResponse } from '../../common/response';
import {
  BERLIN, HAMBURG,
  HANNOVER, STUTTGART, TRIER
} from '../../common/city_types';
import axios from 'axios';
const router = express.Router()
const cities = [BERLIN, HANNOVER, HAMBURG, TRIER, STUTTGART];



const getMinimumPriceForHotel = (data: Array<object>, searchValue: string) => {
  let searchHotel: Array<any> = data?.filter(function (val: any) {
    return val?.city === searchValue;
  });
  return Math.min(...searchHotel?.map(item => item?.priceFrom));
}


const searchHotelWithDateRange = async (dateRange: string) => {
  const dateArray: Array<string> = dateRange?.split(" - ");
  const [checkin, checkout] = dateArray;
  const BLOOKERY_URL: string = `https://blookery.herokuapp.com/api/v1/ownarrival/searchMulti?numPassengers=2&includedDestinations=Berlin%2CHamburg%2CHannover%2CStuttgart%2CTrier&checkin=${checkin}&checkout=${checkout}&flt=ttmin%3D60%3Bttmax%3D999%3B&from=K%C3%B6ln`;
  try {
    return await axios.get(BLOOKERY_URL, {
      headers: {
        'Origin': 'blookery.de',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
      },
    }).then((response) => {
      let { data } = response.data;
      let minumumPriceHotel: any = [];
      if (data) {
        cities.forEach(element => {
          minumumPriceHotel.push({ cityName: element, minPrice: getMinimumPriceForHotel(data, element) });
        });
        return { status: 'success', dateRange, minumumPriceHotel };

      } else {
        cities.forEach(element => {
          minumumPriceHotel.push({ cityName: element, minPrice: null as unknown });
        });
        return { status: 'error', dateRange, minumumPriceHotel: minumumPriceHotel, message: 'No Hotel Found in the given Date Range' };
      }
    })
  } catch (err) {
    errorResponse(dateRange, err);
  }
}

// Routes
router.post('/search/hotel', async (req, res) => {
  const { dateRange1, dateRange2 } = req.body;
  console.log(dateRange1, dateRange2);
  try {
    const searchResponse = {
      dateRange1: await searchHotelWithDateRange(dateRange1),
      dateRange2: await searchHotelWithDateRange(dateRange2),
    }

    return successResponse(res, { ...searchResponse });
  } catch (e) {
    errorResponse(res, e)
  }
})

export default router
