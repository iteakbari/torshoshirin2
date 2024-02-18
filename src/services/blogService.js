import http from "./httpService";

export function getBlogList({ queryKey }) {
  const { categoryId, pageSize, step, token } = queryKey[1];
  return http
    .post(`/DocumentApi/DocumentDetailsList`, { categoryId, pageSize, step })
    .then(({ data }) => data.data.data);
}

export function searchBlog({ categoryId, pageSize, step, keyWord }) {
  return http
    .post(`/DocumentApi/DocumentDetailsList`, {
      categoryId,
      keyWord,
      pageSize,
      step,
    })
    .then(({ data }) => data.data);
}

export function getBlog({ queryKey }) {
  return http
    .get(`/DocumentApi/DocumentDetails?Id=${queryKey[1]}`)
    .then(({ data }) => data.data.data);
}

export function lastAritcle() {
  return http
    .get(`/DocumentApi/CurrentBlog?DocumentGroupId=3`)
    .then(({ data }) => data.data.data);
}
