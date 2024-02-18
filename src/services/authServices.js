import http from "./httpService";

export function getOtp({ phoneNumber }) {
  return http
    .post(`/AccountApi/SendValidateCodeToPhoneNumber`, { phoneNumber })
    .then(({ data }) => data.data);
}

export function checkOtp({ phoneNumber, phoneNumberCode }) {
  return http
    .post("/AccountApi/ConfirmSendedCode", {
      phoneNumber,
      phoneNumberCode,
    })
    .then(({ data }) => data.data);
}

export function getUserProfile({ queryKey }) {
  return http
    .get("/AccountApi/GetProfile", {
      headers: {
        Authorization: "Bearer " + queryKey[1],
      },
    })
    .then(({ data }) => data.data);
}

// export function getUserProfile({ queryKey }) {
//   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/AccountApi/GetProfile`, {
//     headers: {
//       Authorization: "Bearer " + queryKey[1],
//     },
//   })
//     .then((res) => res.json())
//     .then(({ data }) => data);
// }

export function getUserAddressList({ queryKey }) {
  return http
    .get("/AccountApi/GetListAddress", {
      headers: {
        Authorization: "Bearer " + queryKey[1],
      },
    })
    .then(({ data }) => data.data);
}
