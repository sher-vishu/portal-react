import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<any | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getAccessTokenSilently(
          // {
          // authorizationParams: {
          //   audience: 'http://54.65.66.139:8002/',
          // },
        // }
        );
        console.error('fetched token:', fetchedToken);
        setToken(fetchedToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  const callApi = useCallback(
    async (endpoint: string, data = {}) => {
      console.error('access token:', token);
      try {
        if (!token) {
          console.error('Token is not available');
          return null;
        }
        console.log(endpoint, 'calling api')
        const baseURL = 'http://127.0.0.1:9502'; 
        const url = baseURL + endpoint;
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API DATA:', response);
        return response.data;
      } catch (error) {
        console.error('Error calling API:', error);
        throw error;
      }
    },
    [token]
  );

  return {
    token,
    callApi,
  };
};

export default useApi;