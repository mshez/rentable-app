import qs from 'query-string';
import client from '../utils/axios';
import config from '../config';

const URL = `${config.apiUrl}`;

const fetchSearchListings = async (query: object) => {
  const urlParsed = qs.stringify(query);
  return await client.get(`${URL}/search${(urlParsed.length && `?${urlParsed}`) || ''}`);
};
const fetchWantedSearchListings = async (query: object) => {
  const urlParsed = qs.stringify(query);
  return await client.get(`${URL}/search_wanted${(urlParsed.length && `?${urlParsed}`) || ''}`);
};

const fetchListingDetails = async (uuid: string | string[], token: string | null) => {
  if (token) {
    return await client.get(`${URL}/listings/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return await client.get(`${URL}/listings/${uuid}`);
};

const fetchWantedListingDetails = async (uuid: string | string[], token?: string) => {
  if (token) {
    return await client.get(`${URL}/listings_wanted/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return await client.get(`${URL}/listings_wanted/${uuid}`);
};

const setFavouriteListing = async ({
  token,
  id,
  isFav,
  isWantedListing,
}: {
  token: string;
  id: number;
  isFav: boolean;
  isWantedListing?: boolean;
}) => {
  const setUrl = `/${(isWantedListing && 'listings_wanted') || 'listings'}/${
    (isFav && `unfavourite`) || `favourite`
  }/${id}`;
  return await client.post(`${URL}${setUrl}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchOtherUserListings = async (id: string | string[]) => {
  return await client.get(`${URL}/user-listings/${id}`);
};

type ReportListingProps = {
  token: string;
  id: string;
  model: FormData;
};
const reportListing = async ({ token, id, model }: ReportListingProps) => {
  return await client.post(`${URL}/listings/report/${id}`, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type ListingByParentID = {
  id: string | string[];
};
const fetchListingByParentCategory = async ({ id }: ListingByParentID) => {
  return await client.get(`${URL}/search?parent_cat=${id}&perPage=8`);
};

const fetchListingDeepLink = async (model: string) => {
  const data = model;
  return await client.post(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDOecB5R4qQbKBX3gj7Cs_DAZMG09BMWWU`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

const createListing = async ({ token, model }: { token: string; model: FormData }) => {
  return await client.post(`${URL}/listings`, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createWantedListing = async ({ token, model }: { token: string; model: FormData }) => {
  return await client.post(`${URL}/listings_wanted`, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchBlogListings = async (perPage: number) => {
  return await client.get(`${config.blogURL}${config.blogAPIKey}/posts?per_page=${perPage}&page=1`);
};

export default {
  fetchSearchListings,
  fetchListingDetails,
  fetchWantedListingDetails,
  setFavouriteListing,
  fetchOtherUserListings,
  reportListing,
  createListing,
  createWantedListing,
  fetchListingDeepLink,
  fetchListingByParentCategory,
  fetchBlogListings,
  fetchWantedSearchListings,
};
