import http from "./httpService";

export function FAQ() {
  return http.get(`/HomeApi/GetQAList`).then(({ data }) => data);
}
