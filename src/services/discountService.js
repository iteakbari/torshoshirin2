import http from "./httpService";

export function getDiscount({ discountCode, customerId, token }) {
  return http
    .post(
      "/ShoppingCart/CheckAndCalcDiscountCode",
      {
        discountCode,
        customerId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({ data }) => data);
}
