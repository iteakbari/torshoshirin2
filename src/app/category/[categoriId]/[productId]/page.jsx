"use client";
import Comment from "@/components/Comment/Comment";
import HorizontalCard from "@/components/HorizontalCard/HorizontalCard";
import HorizontalCardLoading from "@/components/HorizontalCard/HorizontalCardLoading";
import NewProducts from "@/components/Product/NewProducts";
import ProductCommentList from "@/components/Product/ProductCommentList";
// import NewProductsLoading from "@/components/Product/NewProductsLoading";
import RelatedProducts from "@/components/Product/RelatedProducts";
import useProduct from "@/hooks/useProduct";
import Cookies from "js-cookie";
import Link from "next/link";

const ProductDetails = ({ params }) => {
  const para = params.productId.split("-");
  const { data, isLoading } = useProduct(para[0], para[1]);
  const product = data?.data || "";
  const token = Cookies.get("token");

  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <div className="py-16 grid grid-cols-1 lg:grid-cols-4">
        <div className="col-span-3 bg-white py-7 px-5 md:px-12 shadow-sm rounded-lg">
          {isLoading ? (
            <HorizontalCardLoading />
          ) : (
            <HorizontalCard {...product} />
          )}

          <div className="mt-16">
            {product?.specialFeatures?.map((f) => (
              <div className="flex gap-5 mb-7" key={f.id}>
                <span className="text-xl">{f.title}:</span>
                <p>{f.value ? f.value : "-"}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden lg:block">
          <p className="py-8 text-center text-xl">محصولات جدید</p>
          <NewProducts />
        </div>
      </div>
      <p className="text-xl">نظرات</p>
      <div className="mt-5  px-5">
        <ProductCommentList productId={para[0]} />
      </div>
      <p className="text-xl mt-10">محصولات مرتبط</p>
      <div className="mt-5 bg-white rounded-2xl overflow-hidden py-30px px-3 lg:pr-5">
        <RelatedProducts categoryId={data?.data.categoryId} />
      </div>

      <div className="mt-16 flex flex-col items-center">
        <p className="text-center">
          نظرتون در مورد این محصول چیه؟ 🍊 با ما به اشتراک بگذارین!
        </p>
        <Comment productId={para[0]} />
      </div>
    </div>
  );
};

export default ProductDetails;
