import Suggestion from "@/components/Comment/Suggestion";

const Suggestaion = () => {
  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <p className="text-2xl text-center py-16">انتقادات و پیشنهادات</p>
      <div className="flex flex-col items-center">
        {/* <p className="text-center">
          انتقادات و پیشنهادات خود را با در میان بگذارید.
        </p> */}
        <Suggestion />
      </div>
    </div>
  );
};

export default Suggestaion;
