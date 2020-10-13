import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import client from '../../../utils/axios';
import config from '../../../utils/config';
import { IListing, IListings } from '../../../interface';

const fetcher = async (url: string, token: string | undefined) => {
  if (token) {
    const response = await client.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data.listings;
  }
  const response = await client.get(url);
  return response.data.listings;
};

const baseUrl = `${config.apiUrl}`;

const useGetWantedListings = () => {
  const [page, setPage] = useState(1);
  // const authState = useAuthState();
  // const { isAuthenticated, auth } = authState;
  // const fetchUrl =
  //   (isAuthenticated && [`${baseUrl}/listings_wanted`, auth?.token]) ||
  //   `${baseUrl}/listings_wanted`;
  const fetchUrl = `${baseUrl}/listings_wanted?page=${page}`;
  const { data: result } = useQuery<IListings>(fetchUrl, fetcher);

  const [listings, setListings] = useState<IListing[]>([]);

  useEffect(() => {
    if (result) {
      if (page > 1) {
        setListings((list) => list.concat(result.data));
      } else {
        setListings(result.data);
      }
    }
  }, [result, page]);
  const canViewMore = (result && result.last_page > page) || false;
  return { listings, isLoading: !result, page, setPage, canViewMore };
};

export default useGetWantedListings;
