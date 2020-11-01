import { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { handleAxiosError } from '../utils/handleAxiosError';

interface Error1 {
  errors: {
    [x: string]: string[];
  };
  status: number;
  title: string;
  traceId: string;
  type: string;
}

interface Error2 {
  message: string;
  responseCode: number;
}

const mockService = {
  get: (url: string, mockResult?: any) =>
    new Promise<any>((resolve, reject) => {
      return setTimeout(() => resolve({ data: mockResult }), 2000);
    }),

  post: (url: string, data?: any, mockResult?: any) =>
    new Promise<any>((resolve, reject) => {}),

  put: (url: string, data?: any, mockResult?: any) =>
    new Promise<any>((resolve, reject) => {
      return setTimeout(() => resolve({ data: mockResult }), 2000);
    }),
};

interface IParam {
  [x: string]: string | number;
}
const concatParams = (params?: IParam) => {
  let result = '';

  if (params) {
    const resultString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    if (resultString) {
      result = `?${resultString}`;
    }
  }

  return result;
};

// concatParams();

/**
 * This is a custom hook that is used to make api get requests
 * @param url
 * @param params
 * @param mockResult
 *
 * @returns an object containg error, loading and data
 */
export function useFetchMock<T>(url: string, params?: IParam, mockResult?: T) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const mock = useRef(mockResult);

  const refetch = useCallback(
    (fetchParams = params) =>
      mockService
        .get(url + concatParams(fetchParams), mock.current)
        .then((result: AxiosResponse<T>) => {
          // console.log('result', result);
          setData(result.data);
        })
        .catch((err) => {
          const errorRes = handleAxiosError(err);
          setError(errorRes);
        })
        .finally(() => setLoading(false)),
    [params, url],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { loading, data, error, refetch };
}

/**
 * This is a custom hook that is used to make a lazy api get requests
 * @param url
 * @param params
 * @param mockResult
 *
 * @returns the lazy [method] to call
 */
export function useLazyFetchMock<T>(
  url: string,
  params?: IParam,
  mockResult?: T,
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errorResponse, setErrorResponse] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const mock = useRef(mockResult);

  const callService = useCallback(
    async (fetchParams = params) => {
      setLoading(true);
      setErrorResponse(null);

      return mockService
        .get(url + concatParams(fetchParams), mock)
        .then((result: AxiosResponse<T>) => {
          setData(result.data);

          return { loading: false, data: result.data, error: null };
        })
        .catch((error: AxiosError<Error1 | Error2>) => {
          const errorRes = handleAxiosError(error);
          setErrorResponse(errorRes);
        })
        .finally(() => setLoading(false));
    },
    [params, url],
  );

  const response = { loading, data, error: errorResponse };
  return [callService, response] as const;
}

/**
 * This is a custom hook that is used to make a lazy api post request
 * @param url: the url to post to
 * @param payload the data to post
 * @param mockResult the data to post
 *
 * @returns the lazy [method] to call
 */
export function usePostMock<T>(url: string, payload?: any, mockResult?: T) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errorResponse, setErrorResponse] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const mock = useRef(mockResult);

  const callService = async (serviceData = payload) => {
    setLoading(true);
    setErrorResponse(null);

    return mockService
      .post(url, serviceData, mock)
      .then((result: AxiosResponse<T>) => {
        setData(result.data);

        return {
          loading: false,
          data: result.data,
          error: null,
          config: result.config,
        };
      })
      .catch((error: AxiosError<Error1 | Error2>) => {
        const errorRes = handleAxiosError(error);
        setErrorResponse(errorRes);
        throw errorRes;
      })
      .finally(() => setLoading(false));
  };

  const response = { loading, data, error: errorResponse };
  return [callService, response] as const;
}

/**
 * This is a custom hook that is used to make a lazy api put request
 * @param url: the url to post to
 * @param payload the data to update
 * @param mockResult the data to post
 *
 * @returns the lazy [method] to call
 */
export function usePutMock<T>(url: string, payload?: any, mockResult?: T) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errorResponse, setErrorResponse] = useState<{
    responseCode: number;
    message: string;
  } | null>(null);

  const mock = useRef(mockResult);

  const callService = async (serviceData = payload) => {
    setLoading(true);
    setErrorResponse(null);

    return mockService
      .put(url, serviceData, mock)
      .then((result: AxiosResponse<T>) => {
        setData(result.data);

        return {
          loading: false,
          data: result.data,
          error: null,
          config: result.config,
        };
      })
      .catch((error: AxiosError<Error1 | Error2>) => {
        const errorRes = handleAxiosError(error);
        setErrorResponse(errorRes);
        throw errorRes;
      })
      .finally(() => setLoading(false));
  };

  const response = { loading, data, error: errorResponse };
  return [callService, response] as const;
}
