import client from '../utils/axios';
import config from '../utils/config';
import { ILocationProps } from '../types/interface';

const URL = `${config.apiUrl}`;

const fetchCurrentLocation = async ({ lat, lng }: ILocationProps) => {
  return await client.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.googleAPIKey2}&location_type=APPROXIMATE&result_type=administrative_area_level_1|administrative_area_level_2`
  );
};
const autocompleteApi = async ({ term }: { term: string }) => {
  return await client.get(`https://api.rentable.pk/api/v1/location_autocomplete?term=${term}`);
};
const fetchTrendingLocations = async () => {
  return await client.get(`${URL}/top_listing_locations`);
};

export default { fetchCurrentLocation, autocompleteApi, fetchTrendingLocations };
