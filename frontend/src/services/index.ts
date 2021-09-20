// import axios, {
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
//   Method,
// } from "axios";

export const API_URI = process.env.REACT_APP_API_URI || "http://localhost:8000";

// export const api = ServiceManager(API_URI);

// interface Api {
//   makeRequest: <R>(options: {
//     method: AxiosRequestConfig["method"];
//     endpoint: string;
//     queryParams: Record<string, string>;
//     bodyParams: Record<string, string>;
//     cancelRecover: boolean;
//     apiCallControl: number;
//   }) => Promise<AxiosResponse<R>>;
// }

// function ServiceManager(host: string): Api {
//   let axiosInstance: AxiosInstance = axios.create({
//     baseURL: host,
//     timeout: 2000,
//     headers: {},
//   });
//   let recoveryAttempts = 2;
//   return {
//     makeRequest<R>(options) {
//       const {
//         method = "get",
//         endpoint,
//         queryParams,
//         bodyParams = {},
//         cancelRecover = false,
//         apiCallControl = 1,
//       } = options;
//       return (
//         new Promise((resolve, reject) => {
//           /* Make HTTP request */
//           return axiosInstance[method](
//             `${endpoint}${getQueryParamsString(queryParams)}`,
//             bodyParams
//           );
//         })
//           /* Handle HTTP response errors AND try-to-recover  */
//           .catch(async (e) => {
//             if (cancelRecover === true || apiCallControl > recoveryAttempts) {
//               /* Stop re-trying to recover */
//               handleApiError(e, {
//                 service: "Service-Manager",
//                 endpoint,
//                 apiCallControl: apiCallControl - 1,
//               });
//             }
//             /* Re-try to recover */
//             await new Promise((resolve) =>
//               setTimeout(() => resolve(null), 100)
//             );
//             return this.makeRequest({
//               ...options,
//               apiCallControl: apiCallControl + 1,
//             });
//           })
//       );
//     },
//   };
// }

// function getQueryParamsString(queryParams: Record<string, string>) {
//   return queryParams
//     ? Object.entries(queryParams).reduce((queryString, [param, value]) => {
//         if (!value) return queryString;
//         if (queryString) {
//           // eslint-disable-next-line no-param-reassign
//           queryString += `&${param}=${value}`;
//         } else {
//           // eslint-disable-next-line no-param-reassign
//           queryString += `?${param}=${value}`;
//         }
//         return queryString;
//       }, "")
//     : "";
// }

// function handleApiError(error, { service, endpoint, apiCallControl = 1 }) {
//   if (error.response || error.request) {
//     error.message = `${service}: ${error.message}. Number of API calls: ${apiCallControl}`;
//   } else {
//     error.message = `${service}: Unable to trigger request to ${endpoint}. Number of API calls: ${apiCallControl}. ${error.message} `;
//   }
//   throw error;
// }
