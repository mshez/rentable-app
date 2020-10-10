import { useQuery } from 'react-query';
import { ICategory } from '../../../interface';
import client from '../../../utils/axios';

const apiUrl = 'https://dev.api.rentable.pk/api/v1/trending-categories';

export const fetcher = (url: string) =>
  client
    .get(url)
    .then((res) => {
      return res.data.categories.data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });

const useGetTrendingCategories = () => {
  const { isLoading, data: categories } = useQuery<ICategory[]>(apiUrl, fetcher, {
    refetchInterval: 10000,
  });

  if (categories) {
    return {
      isLoading,
      categories,
    };
  }
  return {
    isLoading: true,
    categories: null,
  };
};
export default useGetTrendingCategories;
