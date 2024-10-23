import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  // withCredentials is not necessary here as we won't be relying on cookies for tokens
});



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we receive a 401 Unauthorized error, attempt to refresh the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Retrieve the refresh token from local storage
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('refresh token', refreshToken);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token API
        const { data } = await axios.post(
          'http://localhost:4000/api/auth/refresh_token',
          { refreshToken }, // Send the refresh token in the request body
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Refreshing token', data);

        // Assuming the new access token is returned in data.accessToken
        const newAccessToken = data.accessToken;

        // Set the new access token in the original request headers
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Store the new access token in local storage (optional)
        localStorage.setItem('accessToken', newAccessToken);

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors (e.g., log the user out)
        console.error('Failed to refresh token:', refreshError);
        // Optionally, handle the logout action here
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401 or if we already tried to refresh, reject the promise
    return Promise.reject(error);
  }
);

export default api;
