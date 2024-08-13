import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productid) => ({
        url: `${PRODUCTS_URL}/${productid}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});


export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;