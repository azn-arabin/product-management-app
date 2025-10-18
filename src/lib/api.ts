import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Product,
  Category,
  AuthResponse,
  CreateProductRequest,
  UpdateProductRequest,
  ProductsQueryParams,
  SearchQueryParams,
} from "./types";
import { RootState } from "./store";

const BASE_URL = "https://api.bitechx.com";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Products", "Product", "Categories"],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation<AuthResponse, { email: string }>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),

    // Products
    getProducts: builder.query<Product[], ProductsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.offset !== undefined)
          queryParams.append("offset", params.offset.toString());
        if (params?.limit !== undefined)
          queryParams.append("limit", params.limit.toString());
        if (params?.categoryId)
          queryParams.append("categoryId", params.categoryId);

        return `/products${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),

    searchProducts: builder.query<Product[], SearchQueryParams>({
      query: (params) => ({
        url: "/products/search",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "SEARCH" },
            ]
          : [{ type: "Products", id: "SEARCH" }],
    }),

    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [
        { type: "Products", id: "LIST" },
        { type: "Products", id: "SEARCH" },
      ],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; data: UpdateProductRequest }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id: "SEARCH" },
        { type: "Product", id: result?.slug },
      ],
    }),

    deleteProduct: builder.mutation<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Products", id: "LIST" },
        { type: "Products", id: "SEARCH" },
      ],
    }),

    // Categories
    getCategories: builder.query<
      Category[],
      { offset?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.offset !== undefined)
          queryParams.append("offset", params.offset.toString());
        if (params?.limit !== undefined)
          queryParams.append("limit", params.limit.toString());

        return `/categories${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
      },
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),

    searchCategories: builder.query<Category[], SearchQueryParams>({
      query: (params) => ({
        url: "/categories/search",
        params,
      }),
      providesTags: [{ type: "Categories", id: "SEARCH" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useSearchCategoriesQuery,
} = api;
