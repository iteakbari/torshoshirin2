// components/AddressMap.js
import React, { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const AddressMap = ({ lat, lng, onLocationChange, setLng, setLat }) => {
  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 14,
  });
  // توجه: کلید API باید از یک متغیر محیطی load شود تا امنیت آن حفظ شود.
  const apiKey = process.env.MAP_API_KEY;
  const [markerArray, setMarkerArray] = useState([]);

  useEffect(() => {
    // به‌روزرسانی viewState هر بار که مقدار lat و ya بر ورودی تغییر کند
    setViewState({
      ...viewState,
      latitude: lat,
      longitude: lng,
    });
    setMarkerArray([
      <Marker
        key="unique-key" // توجه داشته باشید که کلید unique باشد
        latitude={lat}
        longitude={lng}
        anchor="bottom"
        Image={"/assets/img/marker.png"}
      />,
    ]);
  }, [lat, lng]);

  function reverseFunction(e) {
    var url = `https://map.ir/reverse/no?lat=${e?.lngLat?.lat}&lon=${e?.lngLat?.lng}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onLocationChange({
          address: data.postal_address,
          position: e.lngLat,
        });
        setLat(data.geom.coordinates[1]);
        setLng(data.geom.coordinates[0]);
      });

    setMarkerArray([
      <Marker
        key="unique-key" // توجه داشته باشید که کلید unique باشد
        latitude={e?.lngLat?.lat}
        longitude={e?.lngLat?.lng}
        anchor="bottom"
        Image={"/assets/img/marker.png"}
      />,
    ]);
  }

  const onMove = (evt) => {
    setViewState(evt?.viewState);
  };
  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      viewState={viewState}
      onMove={() => onMove()}
      mapStyle="https://map.ir/vector/styles/main/mapir-xyz-style.json"
      transformRequest={(url) => ({
        url,
        headers: {
          "x-api-key": apiKey,
        },
      })}
      onClick={reverseFunction}
    >
      {markerArray}
    </Map>
  );
};

export default AddressMap;
