import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, putUser } from "../../reduxToolkit/User/userThunks";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ShippingForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const { login } = useSelector((state) => state.login);

  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const userId =
    (userSession && userSession.userId) || (login && login.userSession.userId);
  const userName =
    (userSession && userSession.name) || (login && login.userSession.name);
  const userLastname =
    (userSession && userSession.lastname) ||
    (login && login.userSession.lastnamename);
  const [editable, setEditable] = useState({
    address: "",
  });

  useEffect(() => {
    dispatch(getUserId(userId));
  }, [id, dispatch]);

  return (
    <div>
      <div className="flex ">
        <span>{userName}</span>
        <span>{userLastname}</span>
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
{
  /* <NavLink to={`/shippingform/${userId}`}>
  <button className="mt-4 bg-chiliRed text-white hover:bg-onyx font-bold py-2 px-4 rounded">
    Comprar
  </button>
</NavLink>; */
}
