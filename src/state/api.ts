/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetTransactionsResponse, GetProductsResponse, AuthToken, User } from './types';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL as string,
        prepareHeaders: (headers, { getState }) => {
             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            const state = getState() as any;
            // If we have a token set in state, let's assume that we should be passing it.
            if (state?.auth?.token) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            headers.set('Authorization', `Token ${state?.auth?.token}`);
            }
            return headers;
        }
    }),
    reducerPath: 'main',
    tagTypes: ["Kpis", "Products", "Transactions", "userLogin", "userSignup", "User"],
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
        }),
        getUser: build.query<User, void>({
            query: () => "/api/users/i/",
            providesTags: ["User"]
        }),
    })
});

export const { useGetKpisQuery,
    useGetProductsQuery,
    useGetTransactionsQuery,
    useLoginMutation,
    useSignupMutation, useGetUserQuery }  = api;