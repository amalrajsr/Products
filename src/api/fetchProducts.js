import axios from "axios";

export const fetchProducts = async ({ pageParam = 1, query = "" }) => {
  const limit = 15;
  const response = await axios.get(
    `/api/products?limit=${limit}&page=${pageParam}`
  );
  const products = response.data.products;
  console.log("fetch products", products.length);
  // If a query is provided, filter the products by title (case-insensitive)
  const filteredProducts = query
    ? products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : products;
  return {
    products: filteredProducts,
    nextPage: pageParam + 1,
    hasMore: products.length === limit,
  };
};
