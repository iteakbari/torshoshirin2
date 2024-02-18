import http from "./httpService";

export function setPaymentTypeOrder({
  receiverOrderId,
  customerAddressId,
  paymentTypeId,
  token,
}) {
  return http
    .post(
      "/ShoppingCart/SetPaymentTypeOrder",
      {
        receiverOrderId,
        customerAddressId,
        paymentTypeId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({ data }) => data);
}
