// import { FormikValues } from 'formik';
// import { TUserAnalytics } from '../actions/creator/dashboard/types';

// Dashboard
export interface IFetchUserListings {
  perPage?: number;
  page?: number;
}
export interface IEditListingModel {
  title: Pick<IListing, 'title'>;
  short_description: Pick<IListing, 'short_description'>;
  parent_category_id: number;
  child_category_id: number;
  address: string;
  place_id: string;
  rental_period: number;
  rent_per: Pick<IListingAttributes, 'rent_per'>;
  condition: Pick<IListingAttributes, 'condition'>;
  expected_price: Pick<IListingAttributes, 'expected_price'>;
  rental_value_per_period: Pick<IListingAttributes, 'rental_value_per_period'>;
  is_rent_negotiable: Pick<IListingAttributes, 'is_rent_negotiable'>;
}
export interface IEditWantedListingModel {
  title: Pick<IListing, 'title'>;
  short_description: Pick<IListing, 'short_description'>;
  parent_category_id: number;
  child_category_id: number;
  address: string;
  place_id: string;
  rental_period: number;
  condition: Pick<IListingAttributes, 'condition'>;
  expected_price: Pick<IListingAttributes, 'expected_price'>;
  rental_value_per_period: Pick<IListingAttributes, 'rental_value_per_period'>;
  user_id: number;
}
export interface IRentalAgreement {
  agreement: string;
  created_at: string;
  id: number;
  listing_id: number;
  rental_info: string;
  renter_info: string;
  second_party_info: string;
  term_of_business: string;
  updated_at: string;
  user_id: number;
}
export interface IRentalAgreements {
  current_page: number;
  data: IRentalAgreement[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}
export interface IRenterInfo {
  renter_address: string;
  renter_cnic: string;
  renter_name: string;
}
export interface ISecondPartyInfo {
  second_party_address: string;
  second_party_cnic: string;
  second_party_name: string;
}
export interface IRentalInfo {
  agreement_expiry_days: string;
  from: string;
  rental_period: number;
  rental_value: number;
  security_advance: number;
  to: string;
}

export interface IBasicCategory {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
  max_images_allowed: number;
  listing_count: number;
  listing_wanted_count: number;
  ad_age_limit_in_days: number;
  created_at: string;
  updated_at: string;
  image: string;
  properties: [];
}
export interface ICategory extends IBasicCategory {
  children: IBasicCategory[];
}
export interface IChildCategory extends ICategory {
  children: [];
}
export interface IParentCategory extends ICategory {
  children: IChildCategory[];
}
export interface IListingAttributes {
  availability_from: string;
  availability_to: string;
  condition: 'Used' | 'New';
  expected_price: number;
  is_rent_negotiable: boolean;
  other_attributes: string | null;
  rent_per: 'day' | 'month' | null;
  rental_period: number;
  rental_value_per_period: number;
}
export interface ILocation {
  address: string;
  latitude: string;
  longitude: string;
  place_id: string;
}
export interface IUser {
  available_agreements: number;
  created_at: string;
  default_allowed_agreements: number;
  email: string;
  email_verified_at: null | string;
  first_name: string;
  id: number;
  image: string;
  last_name: string;
  phone_number: string;
  purchased_agreements: number;
  remember_me: boolean;
  updated_at: string;
  verified_by_email: boolean;
  verified_by_sms: boolean;
  zip_code: null | string;
  temp_phone_number: string | null;
}
export interface IListing {
  attributes: IListingAttributes;
  child_category: ICategory;
  child_category_id: number;
  created_at: Date | null;
  deleted_at: Date | null;
  favourite: boolean;
  id: number;
  images: Array<string>;
  is_active: boolean;
  is_featured: boolean;
  location: ILocation;
  parent_category: ICategory;
  parent_category_id: number;
  short_description: string;
  title: string;
  updated_at: string;
  user: IUser;
  user_id: number;
  uuid: string;
  view_count: number;
}
export interface IListings {
  current_page: number;
  data: Array<IListing>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: null | string;
  to: number;
  total: number;
}
export interface IFavouriteListings {
  current_page: number;
  data: Array<IFavouriteListing>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: null | string;
  to: number;
  total: number;
}
export interface IFavouriteListing {
  created_at: string;
  id: number;
  listing: IListing | null;
  listing_id: number;
  listing_type: string;
  pivot: {
    user_id: number;
    listing_id: number;
    created_at: string;
    updated_at: string;
  };
  updated_at: string;
  user_id: number;
}
export interface IPageProps {
  canonicalUrl: string;
  listings?: IListings;
}
export interface ILocationProps {
  lat: number;
  lng: number;
}
export interface IGoogleGeocodeResponse {
  address_components: Array<object>;
  formatted_address: string;
  geometry: {
    location: ILocationProps;
  };
  place_id: string;
  types: string[];
}
export interface IResetPasswordProps {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}
export interface ITrendingLocation {
  address: string;
  total: number;
}
export interface IReportListingProps {
  option: string;
  description: string;
  listingId: string;
}
// export interface IPostListingProps {
//   values: FormikValues;
// }

// Theme
export interface ITheme {
  pageWidth: string;
  colors: {
    primary: string;
    secondary: string;
    light: {
      primary: string;
      tertiary: string;
      secondary: string;
      border: string;
    };
    dark: {
      secondary: string;
    };
    plainWhite: string;
    error: string;
  };
}
// Axios
export interface IServerError {
  errors?: string[];
  message?: string;
}
// API Responses
export interface IUserListingsResponse {
  error: boolean;
  favourite_count: number;
  listings: IListings;
}
// Redux States
export interface IGlobalReduxState {
  auth: IAuthReduxState;
  categories: ICategoryReduxState;
  listings: IListingsReduxState;
  location: ILocationReduxState;
  dashboard: IDashboardReduxState;
  common: ICommonReduxState;
  _persist: {
    rehydrated: boolean;
    version: number;
  };
}
export interface IListingsReduxState {
  latestListings: IListings | null;
  featuredListings: IListings | null;
  locationListings: IListings | null;
  wantedListings: IListings | null;

  // UI states
  loading: boolean;
  locationListingsLoading: boolean;
  latestListingsLoading: boolean;
  featuredListingsLoading: boolean;
  wantedListingsLoading: boolean;
  searchListingsLoading: boolean;
}
export interface ICategoryReduxState {
  allCategories: IParentCategory[] | null;
  trendingCategories: IParentCategory[] | null;
}
export type IUserWithTemp = Partial<IUser> & {
  temp_phone_number: string | null;
};
export interface IUIState {
  showLoginModal: boolean;
  redirectAfterLogin: string;
  loginRequestLoading: boolean;
  registerRequestLoading: boolean;
  resetPasswordRequestLoading: boolean;
  showVerificationModal: boolean;
  cookiesConsent: boolean;
}
export interface IAuthReduxState {
  rehydrated: boolean;
  isAuthenticated: boolean;
  user: IUserWithTemp | null;
  token: string | null;
  userPhoneVerified: boolean;
  userEmailVerified: boolean;
  showVerificationAlert: boolean;
  uiStates: IUIState;
}
export interface ICurrentLocationState {
  fullAddress?: string;
  city?: string;
  province?: string;
  location?: ILocationProps;
  placeId?: string;
  error?: string | null;
}
export interface ILocationReduxState {
  currentLocation: ICurrentLocationState | null;
  trendingLocations: ITrendingLocation[] | null;
}
export interface ICommonReduxState {
  backDropLoading: boolean;
  redirectConsent: boolean;
  notifications: any;
}
type TUserAnalytics = {
  listings: { total: number; active: number; featured: number };
  wanted_listings: { total: number; active: number; featured: number };
};
export interface IDashboardReduxState {
  userAnalytics: TUserAnalytics | null;
  userListings: IListings | null;
  userWantedListings: IListings | null;
  userRentalAgreements: IRentalAgreements | null;

  // UI States
  analyticsLoading: boolean;
  resetPasswordLoader: boolean;
  listingLoading: boolean;
  openDeleteDialog: boolean;
  listingDeleting: boolean;
}
