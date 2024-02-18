import Image from "next/image";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <div className="py-16">
        <div className="px-5 lg:px-10">
          <div className="rounded-lg overflow-hidden ">
            <div className="bg-orange text-white text-center py-5 text-3xl">
              تماس با ما
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 ">
              <div className="col-span-1 md:col-span-4">
                <Image
                  src="https://admin.torshoshirin.com/files/react-img/location.png"
                  width={300}
                  height={200}
                  alt="location png"
                  className="w-full h-80 object-cover"
                />
                <div className="h-max sm:h-40 flex items-center justify-center py-5 px-10 sm:px-16 bg-light-green">
                  <p className="text-2xl text-center">
                    مازندران، ساری، خیابان سلمان فارسی، میدان پلیس ، نبش فاتحی،
                    سوپر میوه ترش‌وشیرین
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <Image
                  src="https://admin.torshoshirin.com/files/react-img/phone.png"
                  alt="location png"
                  width={200}
                  height={200}
                  className="w-full h-80 object-cover"
                />
                <div className="h-40 flex items-center justify-center bg-orange">
                  <Link
                    href="tel:09397777258"
                    className="tracking-widest text-3xl md:text-2xl lg:text-3xl"
                  >
                    09397777258
                  </Link>
                </div>
              </div>
              <div className="bg-orange order-2 md:order-1 h-60 col-span-2 flex justify-center items-center">
                <Link
                  href="https://www.instagram.com/torsh_shirin_sari70/"
                  passHref={true}
                  target="_blanck"
                  className="w-36 h-9 flex justify-center items-center text-black font-bold rounded-lg bg-white shadow-sm"
                >
                  Follow
                </Link>
              </div>
              <div className="h-60 col-span-2 order-1 md:order-2 flex justify-center items-center bg-pattern">
                <Image
                  src="https://admin.torshoshirin.com/files/react-img/instagram.png"
                  width={150}
                  height={150}
                  alt="instagram banner"
                />
              </div>
              <div className="bg-light-green h-60 order-3 col-span-2 flex justify-center items-center">
                <Link
                  href="https://www.instagram.com/torsh_shirin_sari70/"
                  passHref={true}
                  target="_blanck"
                  className="h-9"
                >
                  <Image
                    src="https://admin.torshoshirin.com/files/react-img/instaId.png"
                    width={300}
                    height={58}
                    alt="instagram id"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
