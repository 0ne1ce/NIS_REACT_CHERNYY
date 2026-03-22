import { baseApi } from '../../../shared/api/baseApi';
import type { Product, ProductsResponse, ProductsQueryParams } from '../../../entities/product/model/types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ limit, skip, q }) => {
        if (q) {
          return {
            url: '/products/search',
            params: { q, limit, skip },
          };
        }
        return {
          url: '/products',
          params: { limit, skip },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
