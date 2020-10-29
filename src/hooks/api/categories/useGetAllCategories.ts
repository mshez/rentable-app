import { useQuery } from 'react-query';
import { ICategory } from '../../../types/interface';
import client from '../../../utils/axios';
import config from '../../../utils/config';

const apiUrl = `${config.apiUrl}/all-categories`;

export const fetcher = (url: string) =>
  client
    .get(url)
    .then((res) => {
      return res.data.categories;
    })
    .catch((err) => {
      console.log(err.response.data);
    });

const useGetAllCategories = () => {
  const { isLoading, data: categories } = useQuery<ICategory[]>(apiUrl, fetcher);

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
export default useGetAllCategories;
