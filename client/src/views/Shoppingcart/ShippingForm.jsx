import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, putUser } from "../../reduxToolkit/User/userThunks";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ShippingForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getUserId(id));
  }, [id, dispatch]);

  return (
    <div>
      <div className="flex ">
        <span>{user.name}</span>
        <span>{user.lastname}</span>
      </div>
      <div>
        <label> Dirección</label>
        <input
          id="address"
          name="address"
          type="text"
          value={editable.address}
          onChange={handleFieldChange}
          placeholder="Dirección"
        />
      </div>
    </div>
  );
};
export default ShippingForm;
