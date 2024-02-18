"use client";
import Accordion from "@/common/Accordion";
import useFAQ from "@/hooks/useFAQ";

const Faq = () => {
  const { data } = useFAQ();

  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24 px-3">
      <p className="text-2xl text-center py-16">پرسش‌های متداول</p>
      <div className="faq md:w-2/3 mx-auto pb-20">
        {data?.data?.map((faq) => (
          <Accordion key={faq.a} faq={faq} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
