import http from "./httpService";

export function sendCart({ basket, token }) {
  return http
    .post(`/ShoppingCart/UpdateCartITems`, basket, {
      headers: {
        Authorization: `Bearer` + " " + token,
      },
    })
    .then(({ data }) => data.data);
}
