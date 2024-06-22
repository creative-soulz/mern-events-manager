import { apiSlice } from "./apiSlice";
import { DEPARTMENT_URL } from "../constants";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (newDepartment) => ({
        url: `${DEPARTMENT_URL}`,
        method: "POST",
        body: newDepartment,
      }),
    }),

    updateDepartment: builder.mutation({
      query: ({ departmentId, updatedDepartment }) => ({
        url: `${DEPARTMENT_URL}/${departmentId}`,
        method: "PUT",
        body: updatedDepartment,
      }),
    }),

    deleteDepartment: builder.mutation({
      query: (departmentId) => ({
        url: `${DEPARTMENT_URL}/${departmentId}`,
        method: "DELETE",
      }),
    }),

    fetchDepartments: builder.query({
      query: () => `${DEPARTMENT_URL}/department`,
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useFetchDepartmentsQuery,
} = departmentApiSlice;
