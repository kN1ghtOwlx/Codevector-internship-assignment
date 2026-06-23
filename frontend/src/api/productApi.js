import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProducts = async ({
  category = "",
  cursor = null,
  limit = 20,
}) => {
  const params = { limit };

  if (category) params.category = category;
  if (cursor) params.cursor = cursor;

  const response = await api.get("/products", {
    params,
  });

  return response.data;
};