import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";
import { getUserId } from "../../reduxToolkit/User/userThunks";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserId(id));
    };

    fetchData();
  }, [dispatch, id]);
  if (!user) {
    console.log("Rendering loading...");
    return <p>Cargando...</p>;
  }
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="bg-chiliRed bg-opacity-10 p-8 text-eerieBlack rounded-lg shadow-md w-full max-w-screen-md mx-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">{user.username}</h1>
          <div className="flex items-center gap-2">
            <NavLink
              to={`/edituserprofile/${id}`}
              className="text-chiliRed underline flex items-center"
            >
              <IoMdCreate className="mr-1" />
              Editar
            </NavLink>
          </div>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Nombre:</span> {user.name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Apellido:</span> {user.lastname}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Correo Electrónico:</span>{" "}
          {user.email}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Dirección:</span> {user.address}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
