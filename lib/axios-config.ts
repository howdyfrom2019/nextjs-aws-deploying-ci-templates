import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

const autoTradeService = axios.create({
  baseURL: "http://ec2-13-209-118-21.ap-northeast-2.compute.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequest = async (config: AxiosRequestConfig) => {
  const { headers = {} } = config;

  return Promise.resolve({ ...config, headers } as InternalAxiosRequestConfig);
};

/**
 * When facing invalid format before requesting API
 */
const onErrrorRequest = (error: AxiosError<AxiosRequestConfig>) => {
  if (!error.config) {
    console.error(`[🔴 Before Request]: `, "No config detected");
  }

  if (!error.request) {
    console.error(`[🔴 Before Request]: `, "No request detected");
  }

  return Promise.reject(error);
};

autoTradeService.interceptors.request.use(onRequest, onErrrorRequest);

autoTradeService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      throw {
        statusCode: error.response?.status,
        message: error.response?.data.message,
      };
    }
    return Promise.reject(error);
  }
);

export default autoTradeService;
