import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const AddressMapWithNoSSR = dynamic(() => import("./AddressMap"), {
  ssr: false,
});

const MapComponent = ({ lat, lng, setUserAddress, setLat, setLng }) => {
  const [userLocation, setUserLocation] = useState({
    // این مقادیر پیشفرض را می‌توانید تغییر دهید
    lat: 35.6892, // عرض جغرافیایی استاندارد، مثلاً برای تهران
    lng: 51.389, // طول جغرافیایی استاندارد، مثلاً برای تهران
  });

  useEffect(() => {
    if (lat && lng) {
      setUserLocation({ lat, lng });
    }
    // else {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setUserLocation({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       });
    //     },
    //     (error) => {
    //       console.error("Error getting user's location:", error);
    //     },
    //     { enableHighAccuracy: true } // این گزینه را برای دقت بهتر موقعیت اضافه کرده‌ام
    //   );
    // }
  }, [lat, lng]); // افزودن lat و lng به dependency array

  const handleLocationChange = ({ address, position }) => {
    setUserAddress(address);
    // اینجا با نیاز شما ممکن است متفاوت باشد
    setUserLocation({
      lat: position.lat,
      lng: position.lng,
    });
  };

  return (
    <>
      {/* سایر کدهای درون صفحه شما */}
      <AddressMapWithNoSSR
        lat={userLocation.lat}
        lng={userLocation.lng}
        setLat={setLat}
        setLng={setLng}
        onLocationChange={handleLocationChange}
      />
    </>
  );
};

export default MapComponent;
