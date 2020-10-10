import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import client from '../../../utils/axios';
import config from '../../../utils/config';
import { IListings } from '../../../interface';

// import { useAuthState } from '../../../contexts/auth/auth.context';

const fetcher = async (url: string) => {
  // if (token) {
  //   const response = await client.get(url, { headers: { Authorization: `Bearer ${token}` } });
  //   return response.data.listings;
  // }
  const response = await client.get(url);
  return response.data.listings;
};

const baseUrl = `${config.apiUrl}`;

const useGetLatestListings = (initialPerPage?: number) => {
  const [size, setSize] = useState(initialPerPage || 8);
  // const authState = useAuthState();
  // const { isAuthenticated, auth } = authState;
  // const fetchUrl =
  //   (isAuthenticated && [`${baseUrl}/listings`, auth?.token]) || `${baseUrl}/listings`;
  const fetchUrl = `${baseUrl}/listings?per_page${size}`;
  const { data: result } = useQuery<IListings>(fetchUrl, fetcher);

  const [listings, setListings] = useState<IListings | null>(null);

  useEffect(() => {
    if (result) {
      setListings(result);
    }
  }, [result]);
  const canViewMore = (listings && listings?.total > size) || false;
  return { listings, isLoading: !result, size, setSize, canViewMore };
};

export default useGetLatestListings;