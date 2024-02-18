import http from "./httpService";

export function productPostComment({
  commentText,
  rateValue,
  name,
  productId,
  userName,
  token,
}) {
  return http
    .post(
      "/ProductApi/CreateProductComment",
      {
        commentText,
        productId,
        rateValue,
        name,
        userName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(({ data }) => data);
}

export function blogPostComment({
  documentId,
  fullName,
  userName,
  commentText,
  rateValue,
  token,
}) {
  return http
    .post(
      "/DocumentApi/CreateDocumentComment",
      {
        commentText,
        documentId,
        userName,
        fullName,
        rateValue,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(({ data }) => data);
}

export function suggestion({ flName, mobileNumber, description }) {
  return http
    .post("/HomeApi/CreateProductComment", {
      flName,
      mobileNumber,
      description,
    })
    .then(({ data }) => data);
}

export function getProductComments({ queryKey }) {
  const { productId, step, pageSize } = queryKey[1];
  return http
    .post("/ProductApi/ProductCommentList", {
      productId,
      step,
      pageSize,
    })
    .then(({ data }) => data.data);
}

export function getBlogComments({ queryKey }) {
  const { documentId, step, pageSize } = queryKey[1];
  return http
    .post("/DocumentApi/DocumentCommentList", {
      documentId,
      step,
      pageSize,
    })
    .then(({ data }) => data.data);
}

export function selectedComments() {
  return http
    .get("/DocumentApi/SelectedComments")
    .then(({ data }) => data.data);
}
