import axios, { AxiosInstance } from 'axios';

// Auto init axios client with default config
const instance: AxiosInstance = axios.create({
  validateStatus(status: number) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  },
});

const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
};

export { methods };

export default instance;
