import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateNumberDto, Number } from './types';

export const numbersApi = createApi({
  reducerPath: 'numbersApi',
  tagTypes: ['Numbers'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    // get all numbers
    getNumbers: builder.query<Number[], void>({
      query: () => 'numbers',
      providesTags: ['Numbers'],
    }),
    // create a new number with the given data (only the number is required)
    addNumber: builder.mutation<Number, CreateNumberDto>({
      query: (newNumber) => ({
        url: 'numbers',
        method: 'POST',
        body: newNumber,
      }),
      invalidatesTags: ['Numbers'],
    }),
    // edit a number with the given id and data, only the fields that need to be updated are required
    editNumber: builder.mutation<Number, Number>({
      query: ({ id, ...patch }) => ({
        url: `numbers/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Numbers'],
    }),
    // delete a number with the given id
    deleteNumber: builder.mutation<void, string>({
      query: (id) => ({
        url: `numbers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Numbers'],
    }),
  }),
});

export const {
  useGetNumbersQuery,
  useAddNumberMutation,
  useEditNumberMutation,
  useDeleteNumberMutation,
} = numbersApi;
