import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getAllPurchaseHistory } from "../../../reduxToolkit/PurchaseHistory/purchaseHistoryThunks";
import { IoMdCreate } from "react-icons/io";
import EditPurchaseModal from "./EditPurchaseModal";

const ShoppingHistory = () => {
  const dispatch = useDispatch();
  const purchaseHistory = useSelector((state) => state.purchaseHistory.history);
  console.log(purchaseHistory);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);

  useEffect(() => {
    dispatch(getAllPurchaseHistory());
  }, [dispatch]);

  const groupProductsByDate = (purchaseHistory) => {
    const groupedByDate = {};
    {
      purchaseHistory &&
        purchaseHistory.forEach((purchase) => {
          const dateKey = purchase.date;
          if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
          }
          groupedByDate[dateKey].push(purchase);
        });

      return Object.values(groupedByDate);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditClick = (group) => {
    const groupPurchaseIds = group.map((purchase) => purchase.purchaseId);
    dispatch();
    setSelectedPurchaseId(groupPurchaseIds);
    setIsEditing(true);

    // if (purchaseId) {
    //   setSelectedPurchaseId(purchaseId);
    //   setIsEditing(true);
    // }
  };

  const handleCloseEditModal = () => {
    setSelectedPurchaseId(null);
    setIsEditing(false);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="ml-[22%]">
        <h1 className="text-2xl font-bold mb-6 pt-4 text-center">
          Historial de Ventas
        </h1>
        <hr className="text-chiliRed" />
        {purchaseHistory.length === 0 ? (
          <p>Aun no has realizado ninguna compra.</p>
        ) : (
          <ul className="space-y-4">
            {groupProductsByDate(purchaseHistory).map((group, index) => (
              <li key={index} className="space-y-4">
                <p className="font-bold"> Usuario: {group[0].userName}</p>
                <p className="font-bold">
                  Fecha de Compra: {formatDate(group[0].date)}
                </p>
                <p className={"font-bold flex"}>
                  Estado del Pago:
                  <span
                    className={`font-bold ml-2  ${
                      group[0].paymentStatus.toLowerCase() === "rechazado"
                        ? "bg-red border-red text-whiteSmoke rounded p-1"
                        : group[0].paymentStatus.toLowerCase() === "pendiente"
                        ? "bg-yellow border-yellow text-onyx rounded p-1"
                        : group[0].paymentStatus.toLowerCase() === "aprobado"
                        ? "bg-green text-whiteSmoke border-green rounded p-1"
                        : ""
                    }`}
                  >
                    {group[0].paymentStatus.toUpperCase()}
                  </span>
                  <span
                    className="text-2xl ml-3 cursor-pointer"
                    onClick={() => handleEditClick(group)}
                  >
                    <IoMdCreate />
                  </span>
                </p>
                {isEditing && selectedPurchaseId.length > 0 && (
                  <EditPurchaseModal
                    onClose={handleCloseEditModal}
                    purchaseIds={selectedPurchaseId}
                  />
                )}
                <ul className="space-y-2">
                  {group.map((purchase) => (
                    <li
                      key={purchase.purchaseId}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center space-x-4 flex-wrap md:items-center justify-center">
                        <img
                          src={purchase.productImage}
                          alt={purchase.productName}
                          className="w-20 h-20 rounded-md object-contain"
                        />
                        <div>
                          <p className="text-lg font-semibold ">
                            {purchase.productName}
                          </p>
                          <p>Precio: ${purchase.productPrice}</p>
                          <p>Cantidad: {purchase.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr className="text-chiliRed" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShoppingHistory;
