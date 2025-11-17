import { useQuery } from 'react-query'; // This is a hook from react-query that we are importing for data fetching
import api from '../api/api'; // Custom axios instance with predefined configurations
/**
 * this single cusomt hook make use of react query to fetch total clicks across all shortened urls
 * Fetch total clicks across all shortened URLs.
 * Uses React Query for data fetching and caching.
 * @returns {Object} An object containing totalClicks, isLoading, isError, and refetch function. * 
 * @param {*} token authrization token that we will make use of while fetching the data from the backend api call 
 * @param {*} onError callback function to handel error 
 */
export const useFetchTotalClicks = (token, onError) => {

    // useQuery will have three parameters
    // 1. A unique key for the query (queryKey)
    // 2. An asynchronous function that fetches the data (async function)
    // 3. An options object to configure the query behavior
    return useQuery('url-totalclick',
        async () => {
            //api is basically a custom instance of axios with predefined configurations
            return await api.get(
                '/api/urls/totalClicks?startDate=2024-01-01&endDate=2024-12-31', {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        // Options object in this we handel the transformation of the response data that we are getting from the api and 
        // also handel the error if any occurs during the data fetching process and caching as well.
        {
            //select is a fuction that allows us to transform or select a part of the data returned by the query function before it's stored in the cache (or before passing it to component).
            select: (data) => {

                /**
                 * data.data => {
                 *   "2024-10-01": 5,
                 *   "2024-10-02": 10,
                 *   "2024-10-03": 7,
                 * }
                 */
                //converting to array because we need an array of objects
                // making the desired data structure for the graph component  
                const converToArray = Object.keys(data.data).map((key) => ({
                    clickDate: key, 
                    count: data.data[key] // data.data[2024-10-01] => 5
                }));
                
                //Object.keys(data.data) => ["2024-10-01", "2024-10-02", "2024-10-03"]

                //Finall output

                // [
                //   { clickDate: "2024-10-01", count: 5 },
                //   { clickDate: "2024-10-02", count: 10 },
                //   { clickDate: "2024-10-03", count: 7 },
                // ]

                return converToArray;
            },
            onError,
            staleTime: 5000,// staleTime is a duration in milliseconds that defines how long the fetched data is considered fresh.
            //so this query does not refetch data from the server for 5 seconds after the initial fetch.
            //so basically we are caching the data for 5 seconds and the data is reused from cache if the compnent remounts or refreshed within this time frame.
        }
    );
}