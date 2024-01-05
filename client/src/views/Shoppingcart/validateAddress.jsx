// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch} from "react-redux";

// import { NavLink } from "react-router-dom";
// import {
//   updateShippingAddress,
//   updateDropshippingAddress,
// } from "../../reduxToolkit/ShippingInfo/shippingInfoSlice";

// const ValidateAddress = () => {
//   const shippingInfo = useSelector((state) => state.shipping.shippingInfo);
//   console.log(shippingInfo);
//   const dropshippingInfo = useSelector(
//     (state) => state.shipping.dropshippingInfo
//   );
//   console.log(dropshippingInfo);
//   const dispatch = useDispatch();

//   let addressComb = "";
//   if (dropshippingInfo.address !== "") {
//     addressComb = dropshippingInfo.address;
//   } else {
//     addressComb = shippingInfo.address;
//   }
//   console.log(addressComb);
//   const [editable, setEditable] = useState({
//     address: addressComb,
//   });
//   const handleFieldChange = (event) => {
//     const { name, value } = event.target;

//     setEditable((prevEditable) => ({
//       ...prevEditable,
//       [name]: value,
//     }));
//     if (dropshippingInfo && dropshippingInfo.address) {
//       dispatch(updateDropshippingAddress(value));
//     } else if (shippingInfo && shippingInfo.address) {
//       dispatch(updateShippingAddress(value));
//     }
//   };
//   const initMap = () => {
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       center: { lat: 4.55, lng: -74 },
//       zoom: 8,
//     });

//     const marker = new window.google.maps.Marker({
//       map,
//       draggable: true,
//       animation: window.google.maps.Animation.DROP,
//       position: { lat: 4.55, lng: -74 },
//     });

//     window.google.maps.event.addListener(marker, "dragend", function () {
//       actualizarDireccionDesdeMarker();
//     });
    
//   };


//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVAaVadUSfwbDSCN7RiTB45P0ESVDfAdA&libraries=places&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       initMap();
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
//   const actualizarDireccionDesdeMarker = () => {
//     const ubicacion = marker.getPosition();
//     const geocoder = new window.google.maps.Geocoder();
  
//     geocoder.geocode({ location: ubicacion }, function (results, status) {
//       if (status === "OK") {
//         const direccion = results[0].formatted_address;
//         setEditable((prevEditable) => ({ ...prevEditable, address: direccion }));
  
//         if (dropshippingInfo && dropshippingInfo.address) {
//           dispatch(updateDropshippingAddress(direccion));
//         } else if (shippingInfo && shippingInfo.address) {
//           dispatch(updateShippingAddress(direccion));
//         }
//       } else {
//         console.error("Error al obtener la dirección desde la ubicación:", status);
//       }
//     });
//   };

  

//   const validation = () => {
//     const { address } = editable;
//     const geocoder = new window.google.maps.Geocoder();

//     geocoder.geocode({ address }, function (results, status) {
//       if (status === "OK") {
//         const ubicacion = results[0].geometry.location;
//         map.setCenter(ubicacion);
//         marker.setPosition(ubicacion);
//       } else {
//         console.error("Error al validar la dirección:", status);
//       }
//     });
//   };

  
//   return (
//     <div className=" h-90vh pt-5  ">
//       <h2 className="font-bold text-2xl text-center mt-2 mb-6 ">
//         Validación de dirección
//       </h2>
     
      
//       <div>
//         <label className="mr-2 font-bold">Dirección</label>
//         <input
//           className="w-auto px-8 py-1.5 text-lg text-eerieBlack leading-tight  border rounded focus:outline-none focus:shadow-outline mt-5 ml-2"
//           id="address"
//           name="address"
//           type="text"
//           value={editable.address}
//           onChange={handleFieldChange}
//           placeholder="Dirección"
//         />
//       </div>
//       <div id="map" style={{ height: "400px", width: "400px" }}></div>
//       <div>
//       <button
//           className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
//           onClick={validation}
//         >
//           Validar Dirección
//         </button>
        
//       </div>
//       <div>
//         <NavLink to={"/selectpayment"}>
//           <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
//             Confirmar Dirección
//           </button>
//         </NavLink>
//       </div>
//       <NavLink
//         to={`/shippingform`}
//         className="text-chiliRed  hover:text-onyx underline ml-4 "
//       >
//         Regresar
//       </NavLink>
//     </div>
    
//   );
// };
// export default ValidateAddress;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  updateShippingAddress,
  updateDropshippingAddress,
} from "../../reduxToolkit/ShippingInfo/shippingInfoSlice";

const ValidateAddress = () => {
  const shippingInfo = useSelector((state) => state.shipping.shippingInfo);
  const dropshippingInfo = useSelector(
    (state) => state.shipping.dropshippingInfo
  );
  const dispatch = useDispatch();

  let addressComb = "";
  if (dropshippingInfo.address !== "") {
    addressComb = dropshippingInfo.address;
  } else {
    addressComb = shippingInfo.address;
  }

  const [editable, setEditable] = useState({
    address: addressComb,
  });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setEditable((prevEditable) => ({
      ...prevEditable,
      [name]: value,
    }));
    if (dropshippingInfo && dropshippingInfo.address) {
      dispatch(updateDropshippingAddress(value));
    } else if (shippingInfo && shippingInfo.address) {
      dispatch(updateShippingAddress(value));
    }
  };

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -12.04318, lng: -77.02824  },
      zoom: 12,
    });

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      position: { lat: -12.04318, lng: -77.02824 },
    });

    window.google.maps.event.addListener(markerInstance, "dragend", function () {
      actualizarDireccionDesdeMarker(markerInstance);
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVAaVadUSfwbDSCN7RiTB45P0ESVDfAdA&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const actualizarDireccionDesdeMarker = (marker) => {
    const ubicacion = marker.getPosition();
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: ubicacion }, function (results, status) {
      if (status === "OK") {
        const direccion = results[0].formatted_address;
        setEditable((prevEditable) => ({ ...prevEditable, address: direccion }));

        if (dropshippingInfo && dropshippingInfo.address) {
          dispatch(updateDropshippingAddress(direccion));
        } else if (shippingInfo && shippingInfo.address) {
          dispatch(updateShippingAddress(direccion));
        }
      } else {
        console.error("Error al obtener la dirección desde la ubicación:", status);
      }
    });
  };

  const validation = () => {
    const { address } = editable;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, function (results, status) {
      if (status === "OK") {
        const ubicacion = results[0].geometry.location;
        map.setCenter(ubicacion);
        marker.setPosition(ubicacion);
      } else {
        console.error("Error al validar la dirección:", status);
      }
    });
  };

  return (
    <div className="h-90vh pt-5">
      <h2 className="font-bold text-2xl text-center mt-2 mb-6">
        Validación de dirección
      </h2>

      <div>
        <label className="mr-2 font-bold">Dirección</label>
        <input
          className="w-auto px-8 py-1.5 text-lg text-eerieBlack leading-tight border rounded focus:outline-none focus:shadow-outline mt-5 ml-2"
          id="address"
          name="address"
          type="text"
          value={editable.address}
          onChange={handleFieldChange}
          placeholder="Dirección"
        />
      </div>
      <div id="map" style={{ height: "400px", width: "400px" }}></div>
      <div>
        <button
          className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded"
          onClick={validation}
        >
          Validar Dirección
        </button>
      </div>
      <div>
        <NavLink to={"/selectpayment"}>
          <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
            Confirmar Dirección
          </button>
        </NavLink>
      </div>
      <NavLink
        to={`/shippingform`}
        className="text-chiliRed hover:text-onyx underline ml-4"
      >
        Regresar
      </NavLink>
    </div>
  );
};

export default ValidateAddress;

