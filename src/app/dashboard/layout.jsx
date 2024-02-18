import SideBar from "@/components/SideBar/SideBar";
import "../../styles/dashboard.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard pt-24">
      <div className="container 2xl:px-0 mx-auto">
        <div className="grid lg:grid-cols-8 gap-5 py-20">
          <div className="hidden lg:block md:col-span-2">
            <SideBar />
          </div>
          <div className="lg:col-span-6 p-5 sm:p-10 rounded-2xl bg-white shadow-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
