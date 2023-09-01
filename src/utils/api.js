import axios from 'axios';

const BASE_URL = process.env.BASE_URL ?? 'https://whispering-forest-10762-67aca61420cd.herokuapp.com/api'; // Update with your actual API URL
const AUTH_TOKEN = process.env.AUTH_TOKEN ?? 'L1QC7kcMDKT499aRHzrnXlAWn4prCZMQ'; // Update with your actual token

/**
 * The function fetches data from an API endpoint using an authorization token and returns the response
 * data or null if there is an error.
 * @param endpoint - The `endpoint` parameter is a string that represents the specific API endpoint you
 * want to fetch data from. It is appended to the `BASE_URL` to form the complete URL for the API
 * request.
 * @returns The function `fetchApiData` returns the data received from the API endpoint if the request
 * is successful. If there is an error during the request, it logs an error message and returns `null`.
 */
const fetchApiData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: AUTH_TOKEN
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
};

export { fetchApiData };
