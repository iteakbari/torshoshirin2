import http from "./httpService";

export function showItemsCart({ queryKey }) {
  return http
    .get("/ShoppingCart/ShowItemsCart", {
      headers: { Authorization: `Bearer ${queryKey[1]}` },
    })
    .then(({ data }) => data);
}
