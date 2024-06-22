import { apiSlice } from "./apiSlice";
import { PARTICIPANTS_URL } from "../constants";

export const participantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createParticipant: builder.mutation({
      query: (participantData) => ({
        url: `${PARTICIPANTS_URL}/create`,
        method: "POST",
        body: participantData,
      }),
    }),
    getParticipantDetails: builder.query({
      query: (participantId) => ({
        url: `${PARTICIPANTS_URL}/${participantId}`,
        method: "GET",
      }),
    }),
    getParticipantsByEventId: builder.query({
      query: (eventId) => ({
        url: `${PARTICIPANTS_URL}/participants/${eventId}`,
        method: "GET",
      }),
    }),
    getParticipantsByDepartmentId: builder.query({
      query: (departmentId) => ({
        url: `${PARTICIPANTS_URL}/department/${departmentId}`,
        method: "GET",
      }),
    }),
    removeParticipant: builder.mutation({
      query: (participantId) => ({
        url: `${PARTICIPANTS_URL}/${participantId}`,
        method: "DELETE",
      }),
    }),
    updateParticipantById: builder.mutation({
      query: ({ participantId, participantData }) => ({
        url: `${PARTICIPANTS_URL}/${participantId}`,
        method: "PUT",
        body: participantData,
      }),
    }),
  }),
});

export const {
  useUpdateParticipantByIdMutation,
  useCreateParticipantMutation,
  useGetParticipantDetailsQuery,
  useGetParticipantsByEventIdQuery,
  useGetParticipantsByDepartmentIdQuery,
  useRemoveParticipantMutation,
} = participantApiSlice;
