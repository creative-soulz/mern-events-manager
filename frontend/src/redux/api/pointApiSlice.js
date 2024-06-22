// pointApiSlice.js

import { apiSlice } from "./apiSlice";
import { POINTS_URL } from "../constants";

export const pointApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPoint: builder.mutation({
      query: ({ participantId, point }) => ({
        url: `${POINTS_URL}`,
        method: "POST",
        body: { participantId, point },
      }),
    }),
    getPointDetails: builder.query({
      query: ({ pointId, generateWinnersList }) => ({
        url: `${POINTS_URL}/${pointId}`,
        method: "GET",
        params: { generateWinnersList },
      }),
    }),
      getAllPoints: builder.query({
        query: ({ generateWinnersList }) => ({
          url: `${POINTS_URL}`,
          method: "GET",
          params: { generateWinnersList },
        }),
      }),
      updatePoint: builder.mutation({
        query: ({ pointId, point }) => ({
          url: `${POINTS_URL}/${pointId}`,
          method: "PUT",
          body: { point },
        }),
      }),
      deletePoint: builder.mutation({
        query: (pointId) => ({
          url: `${POINTS_URL}/${pointId}`,
          method: "DELETE",
        }),
      }),
    fetchPointsByDepartment: builder.query({
      query: () => ({
        url: `${POINTS_URL}/points/department`,
        method: "GET",
      }),
    }),
    fetchPointsForDepartment: builder.query({
      query: (departmentName) => ({
        url: `${POINTS_URL}/department/${departmentName}/points`,
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useCreatePointMutation,
  useGetPointDetailsQuery,
  useGetAllPointsQuery,
  useUpdatePointMutation,
  useDeletePointMutation,
  useFetchPointsByDepartmentQuery,
  useFetchPointsForDepartmentQuery,
} = pointApiSlice;
