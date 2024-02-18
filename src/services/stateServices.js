import http from "./httpService";

export function getStates() {
  return http.get("/HomeApi/BaseInfo").then(({ data }) => data.data);
}
