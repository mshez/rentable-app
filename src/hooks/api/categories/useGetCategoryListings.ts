import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { IListing, IListings } from '../../../types/interface';
import client from '../../../utils/axios';
import config from '../../../utils/config';

export const fetcher = (url: string) =>
  client
    .get(url)
    .then((res) => {
      return res.data.listings;
    })
    .catch((err) => {
      console.log(err.response.data);
    });

const useGetCategoryListings = (slug: string) => {
  const [page, setPage] = useState(1);
  const apiUrl = `${config.apiUrl}/search?parent_cat=${slug}&page=${page}`;
  const { isLoading, data: result } = useQuery<IListings>(apiUrl, fetcher);
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

  if (listings) {
    return {
      isLoading,
      listings,
      page,
      setPage,
      canViewMore,
    };
  }
  return {
    isLoading: true,
    listings: null,
    page,
    setPage,
    canViewMore,
  };
};
export default useGetCategoryListings;
