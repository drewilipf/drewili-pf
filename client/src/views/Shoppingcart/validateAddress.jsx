import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  updateShippingAddress,
  updateDropshippingAddress,
} from "../../reduxToolkit/ShippingInfo/shippingInfoSlice";

const ValidateAddress = () => {
  const shippingInfo = useSelector((state) => state.shipping.shippingInfo);
  console.log(shippingInfo);
  const dropshippingInfo = useSelector(
    (state) => state.shipping.dropshippingInfo
  );
  console.log(dropshippingInfo);
  const dispatch = useDispatch();

  let addressComb = "";
  if (dropshippingInfo.address !== "") {
    addressComb = dropshippingInfo.address;
  } else {
    addressComb = shippingInfo.address;
  }
  console.log(addressComb);
  const [editable, setEditable] = useState({
    address: addressComb,
  });
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
  return (
    <div className=" h-90vh pt-5  ">
      <h2 className="font-bold text-2xl text-center mt-2 mb-6 ">
        Validación de dirección
      </h2>
      <div>
        <label className="mr-2 font-bold">Dirección</label>
        <input
          className="w-auto px-8 py-1.5 text-lg text-eerieBlack leading-tight  border rounded focus:outline-none focus:shadow-outline mt-5 ml-2"
          id="address"
          name="address"
          type="text"
          value={editable.address}
          onChange={handleFieldChange}
          placeholder="Dirección"
        />
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
        className="text-chiliRed  hover:text-onyx underline ml-4 "
      >
        Regresar
      </NavLink>
    </div>
  );
};
export default ValidateAddress;
