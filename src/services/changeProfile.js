import http from "./httpService";

export function changeProfile({
  id,
  firstName,
  lastName,
  phoneNumber,
  cityId,
  stateId,
  userName,
  address,
  longY,
  latX,
  codePost,
  phonNumber2,
  cityName,
  stateName,
  token,
}) {
  return http
    .post(
      "/AccountApi/CHangeProfile",
      {
        id,
        firstName,
        lastName,
        phoneNumber,
        cityId,
        stateId,
        userName,
        address,
        longY,
        latX,
        codePost,
        phonNumber2,
        cityName,
        stateName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(({ data }) => data);
}
