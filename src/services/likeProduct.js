import { headers } from "../../next.config";
import http from "./httpService";

export function likeProduct({ productId, token }) {
  return http
    .post(
      `/ProductApi/SaveFavorite?ProductId=${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => data.data);
}

export function getLikedProducts({ queryKey }) {
  return http
    .post(
      "https://webservice.torshoshirin.com/api/ProductApi/ListFavorite",
      {},
      {
        headers: {
          Authorization: "Bearer " + queryKey[1],
        },
      }
    )
    .then(({ data }) => data.data);
}
