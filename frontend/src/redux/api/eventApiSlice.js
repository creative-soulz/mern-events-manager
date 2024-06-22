import { EVENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ keyword }) => ({
        url: `${EVENT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Events"],
    }),

    getEventById: builder.query({
      query: (eventId) => `${EVENT_URL}/${eventId}`,
      providesTags: (result, error, eventId) => [
        { type: "Events", id: eventId },
      ],
    }),

    allEvents: builder.query({
      query: () => `${EVENT_URL}/allEvents`,
    }),

    // getEventDetails: builder.query({
    //   query: (eventId) => ({
    //     url: `${EVENT_URL}/${eventId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),

    createEvent: builder.mutation({
      query: (eventData) => ({
        url: `${EVENT_URL}`,
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: builder.mutation({
      query: ({ eventId, formData }) => ({
        url: `${EVENT_URL}/${eventId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENT_URL}/${eventId}`,
        method: "DELETE",
      }),
      providesTags: ["Event"],
    }),
        getPrizePointsByEventId: builder.query({
          query: (eventId) => ({
            url:`${EVENT_URL}/${eventId}/prize-Points`,
        }),
      })

    // getFilteredProducts: builder.query({
    //   query: ({ checked, radio }) => ({
    //     url: `${EVENT_URL}/filtered-products`,
    //     method: "POST",
    //     body: { checked, radio },
    //   }),
    // }),
  }),
});

export const {
  useGetEventByIdQuery,
  useGetEventsQuery,
  useAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetPrizePointsByEventIdQuery,
} = eventApiSlice;
