import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetTransactionsResponse, GetProductsResponse, AuthToken, User } from './types';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
            headers.set('Authorization', `Token ${token}`);
            }
            return headers;
        }
    }),
    reducerPath: 'main',
    tagTypes: ["Kpis", "Products", "Transactions", "userLogin", "userSignup"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "/api/keys-performance-indicators/",
            providesTags: ["Kpis"]
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "/api/products/",
            providesTags: ["Products"]
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "/api/transactions/",
            providesTags: ["Transactions"]
        }),
        login: build.mutation({
            query: (data: AuthToken) => ({
                url: '/api/obtain-auth-token/',
                method: 'POST',
                body: data,
                providesTags: ["userLogin"]
            })
        }),
        signup: build.mutation({
            query: (data: User) => ({
                url: '/api/users/',
                method: 'POST',
                body: data,
                providesTags: ["userSignup"]
            })
        })
    })
});

export const { useGetKpisQuery,
    useGetProductsQuery,
    useGetTransactionsQuery,
    useLoginMutation,
    useSignupMutation }  = api;