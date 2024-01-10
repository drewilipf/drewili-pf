import React, { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getAllPurchaseHistory } from "../../../reduxToolkit/PurchaseHistory/purchaseHistoryThunks";

const ShoppingHistory = () => {
  const dispatch = useDispatch();
  const purchaseHistory = useSelector((state) => state.purchaseHistory.history);
  console.log(purchaseHistory);

  useEffect(() => {
    dispatch(getAllPurchaseHistory());
  }, [dispatch]);
  const groupProductsByDate = (purchaseHistory) => {
    const groupedByDate = {};
    purchaseHistory.forEach((purchase) => {
      const dateKey = purchase.date;
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(purchase);
    });

    return Object.values(groupedByDate);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    console.log(dateString);
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="ml-[22%]">
        <h1 className="text-2xl font-bold mb-6 pt-4 text-center">
          Historial de Ventas
        </h1>
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
                <p className="font-bold">
                  Estado del Pago: {group[0].paymentStatus.toUpperCase()}
                </p>
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
