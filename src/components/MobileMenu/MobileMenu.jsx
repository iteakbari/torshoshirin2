import Link from "next/link";
import Logout from "../Logout/Logout";

const MobileMenu = ({ setIsOpen, token }) => {
  return (
    <div className="w-full h-full bg-green text-white py-20 overflow-auto no-scroll">
      <ul className="grid gap-10 px-10">
        <li>
          <Link href="/" onClick={() => setIsOpen(false)}>
            خانه
          </Link>
        </li>
        <li>
          <Link href="/category" onClick={() => setIsOpen(false)}>
            دسته‌بندی
          </Link>
        </li>
        <li>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            بلاگ
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            درباره‌ما
          </Link>
        </li>
        <li>
          <Link href="/contactus" onClick={() => setIsOpen(false)}>
            تماس با ما
          </Link>
        </li>
        {!token && (
          <li>
            <Link href="/sign" onClick={() => setIsOpen(false)}>
              ورود/ ثبت نام
            </Link>
          </li>
        )}
        {token && (
          <>
            <li>
              <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
                پروفایل
              </Link>
            </li>
            <li>
              <Link href="/dashboard/orders" onClick={() => setIsOpen(false)}>
                سفارش‌ها
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/myAddress"
                onClick={() => setIsOpen(false)}
              >
                آدرس‌های من
              </Link>
            </li>
            {/* <li>
              <Link href="/dashboard/lstSeen" onClick={() => setIsOpen(false)}>
                بازدیدهای اخیر
              </Link>
            </li> */}
            <li>
              <Link
                href="/dashboard/favorites"
                onClick={() => setIsOpen(false)}
              >
                لیست علاقمندی‌ها
              </Link>
            </li>
            <li className="mt-auto">
              <Logout>
                <Link
                  href="#"
                  className="flex gap-2 justify-between p-2 items-center hover:bg-gray-200 rounded-xl transition-all"
                >
                  خروج از حساب کاربری
                </Link>
              </Logout>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
