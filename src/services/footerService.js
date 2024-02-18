import http from "./httpService";

export function getFooterData() {
  return http.post("/FooterApi/GetFooterInfo").then(({ data }) => data.data);
}
