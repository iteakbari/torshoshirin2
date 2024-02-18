import MapComponent from "@/common/Map";
import TextareaFieldInput from "@/common/TextareaFieldInput";

const Address = ({ address, addressHandler, selectedAddress }) => {
  return (
    <>
      <div className="pt-4 w-half">
        <TextareaFieldInput
          label="آدرس"
          name="address"
          customClass="mt-3"
          value={address}
          onChange={addressHandler}
        />
      </div>
      <div className="w-half">
        <p className="pb-2">موقعیت مکانی آدرستان را روی نقشه مشخص کنید.</p>
        <div className="h-56">
          {/* <MapComponent
            lat={selectedAddress?.latX}
            lng={selectedAddress?.lngY}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Address;
