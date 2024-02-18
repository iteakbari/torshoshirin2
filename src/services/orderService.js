import http from "./httpService";

export function getOrderList({ queryKey }) {
  return http
    .post(
      "/OrderApi/DisplayTheListOfUserOrders",
      {},
      {
        headers: {
          Authorization: "Bearer" + " " + queryKey[1],
        },
      }
    )
    .then(({ data }) => data.data);
}

export function getOrderDetails({ queryKey }) {
  return http
    .post(
      "/OrderApi/DisplayTheListOfUserDetailsOrders",
      {
        orderId: queryKey[1].id,
      },
      {
        headers: {
          Authorization: "Bearer" + " " + queryKey[1].token,
        },
      }
    )
    .then(({ data }) => data.data);
}
