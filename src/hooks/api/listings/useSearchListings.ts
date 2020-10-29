import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { IListing, IListings } from '../../../types/interface';
import client from '../../../utils/axios';
import config from '../../../utils/config';

const baseUrl = `${config.apiUrl}`;

const fetcher = async (url: string) => {
  const response = await client.get(`${baseUrl}${url}`);
  return response.data;
};

const useSearchListings = (shouldFetch: any, page: number) => {
  const { data: result } = useSWR<null | { listings: IListings }>(shouldFetch, fetcher, {
    dedupingInterval: 10000,
  });
  const [listings, setListings] = useState<IListing[]>([]);

  useEffect(() => {
    if (result && page > 1) {
      setListings((prev) => [...prev, ...result.listings.data]);
    } else if (result) {
      setListings(result.listings.data);
    }
  }, [result, page]);
  const canViewMore = (result && result.listings.last_page > page) || false;
  return {
    isLoading: !result,
    canLoadMore: canViewMore,
    Listings: listings,
  };
};
export default useSearchListings;
