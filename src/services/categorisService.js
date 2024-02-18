import http from "./httpService";

export function getCategories() {
  return http.get("/CategoryApi/Index").then(({ data }) => data.data);
}
