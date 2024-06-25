import axios from 'axios';
// import * as AxiosLogger from 'axios-logger';

// const host = AppEnvConstant.EXPO_PUBLIC_API_SERVER;

const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com",
});

// apiClient.interceptors.request.use(request => {
//     const jwtToken: string | null = SecureStore.getItem(
//         ELocalStorageEnum.ACCESS_TOKEN,
//     );
//     if (jwtToken) {
//         request.headers['Authorization'] = `Bearer ${jwtToken}`;
//     }

//     return request;
// });

apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    },
);

export { apiClient };
