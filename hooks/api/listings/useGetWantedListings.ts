import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import client from '../../../utils/axios';
import config from '../../../utils/config';
import { IListings } from '../../../interface';

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
  // const [size, setSize] = useState(4);
  // const authState = useAuthState();
  // const { isAuthenticated, auth } = authState;
  // const fetchUrl =
  //   (isAuthenticated && [`${baseUrl}/listings_wanted`, auth?.token]) ||
  //   `${baseUrl}/listings_wanted`;
  const fetchUrl = `${baseUrl}/listings_wanted`;
  const { data: result } = useQuery<IListings>(fetchUrl, fetcher);

  const [listings, setListings] = useState<IListings | null>(null);

  useEffect(() => {
    if (result) {
      setListings(result);
    }
  }, [result]);
  // const canViewMore = (listings && listings?.total > size) || false;
  return { listings, isLoading: !result };
};

export default useGetWantedListings;
