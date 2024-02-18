import http from "./httpService";

export function addressFunc({
  id,
  cityId,
  stateId,
  receiverMyself,
  longY,
  latX,
  address,
  codePost,
  phoneNumber,
  mobileNumber,
  fname,
  lname,
  token,
}) {
  return http
    .post(
      "/AccountApi/CreateAddress",
      {
        id,
        cityId,
        stateId,
        receiverMyself,
        longY,
        latX,
        address,
        codePost,
        phoneNumber,
        mobileNumber,
        fname,
        lname,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => data.data);
}

export function editAddressFunc({
  id,
  cityId,
  stateId,
  receiverMyself,
  longY,
  latX,
  address,
  codePost,
  phoneNumber,
  mobileNumber,
  fname,
  lname,
  token,
}) {
  return http
    .post(
      "/AccountApi/EditAddress",
      {
        id,
        cityId,
        stateId,
        receiverMyself,
        longY,
        latX,
        address,
        codePost,
        phoneNumber,
        mobileNumber,
        fname,
        lname,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => data.data);
}

export function deleteAddress({ id, token }) {
  return http.post(
    `/AccountApi/DeleteAddress?CustomerAddressId=${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function setAddressOrder({
  receiverOrderId,
  customerAddressId,
  paymentTypeId,
  token,
}) {
  return http.post(
    "/ShoppingCart/SetAddressOrder",
    {
      receiverOrderId,
      customerAddressId,
      paymentTypeId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
