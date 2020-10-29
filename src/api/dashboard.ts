import client from '../utils/axios';
import config from '../utils/config';

import {
  IEditListingModel,
  IEditWantedListingModel,
  IResetPasswordProps,
} from '../types/interface';

const URL = `${config.apiUrl}`;

const fetchUserAnalytics = async ({ token }: { token: string }) => {
  return await client.get(`${URL}/user_analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const resetPassword = async ({ token, values }: { values: IResetPasswordProps; token: string }) => {
  const model = {
    old_password: values.currentPassword,
    password: values.password,
    password_confirmation: values.repeatPassword,
  };
  return await client.put(`${URL}/update-user-password`, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateProfilePicture = async ({ token, image }: { image: File; token: string }) => {
  const model = new FormData();
  model.append('avatar', image);
  return await client.post(`${URL}/profile-avatar`, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteUserListing = async ({ token, listingId }: { token: string; listingId: string }) => {
  const url = `${URL}/user-listings/delete/${listingId}`;
  return await client.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteUserWantedListing = async ({
  token,
  listingId,
}: {
  token: string;
  listingId: string;
}) => {
  const url = `${URL}/user-listings_wanted/delete/${listingId}`;
  return await client.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export type TEditListing = {
  token: string;
  listingId: string;
  dataModel: IEditListingModel;
};
const editUserListing = async ({ token, listingId, dataModel }: TEditListing) => {
  // const data = qs.stringify(dataModel);
  return await client.put(`${URL}/listings/${listingId}`, dataModel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export type TEditWantedListing = {
  token: string;
  listingId: string;
  dataModel: IEditWantedListingModel;
};
const editWantedListing = async ({ token, listingId, dataModel }: TEditWantedListing) => {
  return await client.put(`${URL}/listings_wanted/${listingId}`, dataModel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createRentalAgreement = async ({ token, model }: { token: string; model: FormData }) => {
  return await client.post(`${URL}/rental-agreement`, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  fetchUserAnalytics,
  resetPassword,
  updateProfilePicture,
  deleteUserListing,
  deleteUserWantedListing,
  createRentalAgreement,
  editUserListing,
  editWantedListing,
};
