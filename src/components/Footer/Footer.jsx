"use client";
import useFooter from "@/hooks/useFooter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { data } = useFooter();

  if (data) {
    localStorage.setItem("currency", data.currencyUnit.title);
  }

  return (
    <footer className="px-16 md:px-0 pt-5">
      <div className="container mx-auto">
        <ul className="custome-border-top custome-border-bottom grid justify-center md:flex md:justify-around xl:px-20 py-4">
          <li className="py-3 text-center flex-1 custome-border-left">
            <Link href="/about" className="xl:text-xl">
              درباره ما
            </Link>
          </li>
          {/* <Divider
            orientation="vertical"
            className="divider-color border-2 w-20 mx-auto  md:w-auto"
            variant="middle"
            flexItem
          /> */}
          <li className="py-3 text-center flex-1 custome-border-left">
            <Link href="/faq" className="md:text-md xl:text-xl">
              پرسش‌های متداول
            </Link>
          </li>
          <li className="py-3 text-center flex-1 custome-border-left">
            <Link href="/suggestion" className="xl:text-xl">
              انتقادات و پیشنهادات
            </Link>
          </li>
          <li className="py-3 text-center flex-1 custome-border-left">
            <Link href="/rules" className="xl:text-xl">
              قوانین خدمات
            </Link>
          </li>
          <li className="py-3 text-center flex-1 ">
            <Link href="/about" className="xl:text-xl">
              شرایط بهداشتی فروشگاه
            </Link>
          </li>
        </ul>
        <div className="py-10 custome-border-bottom divider-color flex flex-wrap">
          <div className="sm-custome-border-left pb-5 md:pb-0 flex-1 min-w-200 mb-3">
            <div className="grid place-content-center gap-3 text-center">
              <h5 className="text-xl">تماس با ما</h5>
              <Link
                href="mailto:info@torshoshirin.com"
                className="text-color-light"
              >
                {data?.contactUsEmail}
              </Link>
              <Link href="tel:09397777258" className="text-color-light">
                {data?.contactUsMobileNumber}
              </Link>
            </div>
          </div>
          <div className="sm-custome-border-left pb-5 md:pb-0 flex-1 min-w-200 mb-3">
            <div className="grid place-content-center gap-3 text-center">
              <h5 className="text-xl">درباره ما</h5>
              <address className="text-color-light">{data?.address}</address>
              {/* <Link href="tel:09397777258" className="text-color-light">
                {data?.contactUsMobileNumber}
              </Link> */}
              <Link href="/contactus" className="text-color-light">
                8 صبح - 1 شب
              </Link>
            </div>
          </div>
          <div className="pb-5 md:pb-0 flex-1 flex flex-wrap justify-center  min-w-200">
            <div className="grid place-content-center gap-5 text-center flex-1">
              {/* <h5 className="text-xl">شبکه‌های اجتماعی</h5> */}
              <div className="flex gap-5 md:grid justify-center">
                <Link
                  href={data?.instagramName || "#"}
                  passHref={true}
                  target="_blanck"
                  className="flex justify-center w-12 h-12"
                >
                  <Image
                    src="https://admin.torshoshirin.com/files/react-img/insta.png"
                    width={46}
                    height={46}
                    alt="instagram"
                  />
                </Link>
                <Link
                  href={
                    `https://web.telegram.org/k/#@${data?.telegramPhoneNumber}` ||
                    "#"
                  }
                  passHref={true}
                  target="_blanck"
                  className="flex justify-center w-12 h-12"
                >
                  <Image
                    src="https://admin.torshoshirin.com/files/react-img/telegram.png"
                    width={46}
                    height={46}
                    alt="telegram"
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-end">
              <Link href="#" className="flex justify-center">
                <Image
                  src="https://admin.torshoshirin.com/files/react-img/enamad.png"
                  width={100}
                  height={144}
                  alt="instagram"
                />
              </Link>
              <Link href="#" className="flex justify-center">
                <Image
                  src="https://admin.torshoshirin.com/files/react-img/samandehi.png"
                  width={120}
                  height={120}
                  alt="telegram"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="py-3">
          <p className="text-center">
            تمام حقوق سایت برای فروشگاه اینترنتی ترش‌و‌شیرین‌ محفوظ است.
          </p>
          <p className="text-center">
            Developed by{" "}
            <Link
              href="https://jco.ir"
              passHref={true}
              className="underline underline-offset-8"
            >
              jco.ir
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
