import client from '../utils/axios';
import config from '../config';

const URL = `${config.apiUrl}`;

const register = async (data: FormData) => {
  return await client.post(`${URL}/register`, data);
};

const forgetPassword = async (data: FormData) => {
  return await client.post(`${URL}/recover`, data);
};
interface ISignInProps {
  email: string;
  password: string;
}
const signIn = async ({ email, password }: ISignInProps) => {
  const bodyFormData = new FormData();
  bodyFormData.append('email', email);
  bodyFormData.append('password', password);
  return await client.post(`${URL}/login`, bodyFormData);
};
interface ISocialLoginProps {
  accessToken: string;
  provider: string;
}
const socialLogin = async ({ accessToken, provider }: ISocialLoginProps) => {
  const body = new FormData();
  body.append('provider', provider);
  body.append('token', accessToken);
  return await client.post(`${URL}/login/social`, body);
};

const verifyPhoneNumber = async ({
  accessToken,
  phoneNumber,
}: {
  accessToken: string;
  phoneNumber: string;
}) => {
  const body = new FormData();
  const phonenumber = `+92${phoneNumber}`;
  body.append('phone_number', phonenumber);
  return client.post(`${URL}/user/verify/sms`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

const verifyPhoneCode = async ({
  accessToken,
  code,
}: {
  accessToken: string | null;
  code: string;
}) => {
  return await client.post(`${URL}/user/verify/sms/${code}`, null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export { register, signIn, socialLogin, verifyPhoneNumber, verifyPhoneCode, forgetPassword };
