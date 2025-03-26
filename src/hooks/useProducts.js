import { useInfiniteQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { fetchProducts } from "../api/fetchProducts";
import { useCallback } from "react";

export function useProducts(query) {
  // Debounce the query
  const debouncedQuery = useCallback(
    debounce((val) => val, 300),
    []
  );

  const activeQuery = debouncedQuery(query);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", activeQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        pageParam,
        query: activeQuery,
      }),
    getNextPageParam: (lastPage) => {
      // Check whether there's another page to fetch
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    enabled: Boolean(activeQuery || activeQuery === ""),
  });

  // Flatten pages if needed
  const allProducts = data?.pages?.flatMap((page) => page.products) || [];

  return {
    products: allProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
}
