import Image from "next/image";

const Rules = () => {
  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <p className="text-2xl text-center py-16">شرایط و قوانین خدمات</p>
      <div className="bg-gray p-10 rounded-3xl grid md:grid-cols-6">
        <div className="col-span-4">
          <p className="leading-7 text-justify ">
            سایت ترش شیرین در صورت بروز مشکل در پردازش نهایی سبد خرید مانند
            اتمام موجودی کالا یا انصراف مشتری، مبلغ پرداخت شده طی 2 الی 12 ساعت
            کاری به حساب مشتری واریز خواهد شد.
          </p>
          <p className="leading-7 text-justify">
            افزودن کالا به سبد خرید به معنی رزرو کالا نیست و هیچ‌گونه حقی را
            برای مشتریان ایجاد نمی‌کند.
          </p>
          <p className="leading-7 text-justify">
            ترش شیرین در حال حاضر در مناطق اعلام شده در سایت امکان دلیوری و
            ارسال سفارش رایگان را دارد.
          </p>
          <p className="leading-7 text-justify">
            سایت ترش شیرین به اطلاعات خصوصی اشخاصى که از خدمات سایت استفاده
            می‏‌کنند، احترام گذاشته و از آن محافظت می‏‌کند.
          </p>
          <p className="leading-7 text-justify">
            سایت ترش شیرین متعهد می‏‌شود در حد توان از حریم شخصی شما دفاع کند و
            در این راستا، تکنولوژی مورد نیاز برای هرچه مطمئن‏‌تر و امن‏‌تر شدن
            استفاده شما از سایت را توسعه دهد.
          </p>
        </div>
        <div className="col-span-6 md:col-span-2 lg:px-10 flex justify-center w-full">
          <Image
            width={400}
            height={250}
            alt="blog image"
            src="https://admin.torshoshirin.com/files/react-img/rules.png"
            className="sm:w-1/2 md:w-auto h-max "
          />
        </div>
      </div>
    </div>
  );
};

export default Rules;
