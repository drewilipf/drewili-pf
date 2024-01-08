import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseHistory } from "../../reduxToolkit/PurchaseHistory/purchaseHistoryThunks";
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PurchaseHistoryComponent = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const purchaseHistory = useSelector((state) => state.purchaseHistory.data);
  const loading = useSelector((state) => state.purchaseHistory.loading);
  const error = useSelector((state) => state.purchaseHistory.error);

  useEffect(() => {
    dispatch(getPurchaseHistory(userId));
  }, [dispatch, userId]);

  const groupProductsByDate = (purchaseHistory) => {
    const groupedByDate = {};
    purchaseHistory.forEach((purchase) => {
      const dateKey = purchase.date; // Ajusta según el formato de fecha que recibes
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(purchase);
    });

    return Object.values(groupedByDate);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    console.log(dateString);
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <p className="text-black">Cargando historial de compras...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error al cargar el historial de compras: {error}</p>;
  }

  return (
    <div className="text-black p-8 rounded-lg shadow-sm md:w-60vw mx-auto shadow-onyx mt-2 mb-2">
      <h2 className="text-3xl font-semibold mb-6">Historial de Compras</h2>
      {purchaseHistory.length === 0 ? (
        <p>Aun no has realizado ninguna compra.</p>
      ) : (
        <ul className="space-y-4">
          {groupProductsByDate(purchaseHistory).map((group, index) => (
            <li key={index} className="space-y-4">
              <p className="font-bold">Fecha de Compra: {formatDate(group[0].date)}</p>
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
                        <p className="text-lg font-semibold ">{purchase.productName}</p>
                        <p>Precio: ${purchase.productPrice}</p>
                        <p>Cantidad: {purchase.quantity}</p>
                      </div>
                    </div>
                      <div className='p-2 rounded shadow-sm shadow-eerieBlack'>
                        <NavLink to={`/detail/${purchase.productId}`} className="flex items-center space-x-4">
                          <h3 className='hover:scale-105'>Volver a comprar</h3>
                        </NavLink>
                        <hr className='text-chiliRed'/>
                        <NavLink>
                          <h3 className='hover:scale-105 hover:drop-shadow-sm hover:shadow-onyx'>Opinar</h3>
                        </NavLink>
                      </div>
                  </li>
                ))}
              </ul>
              <hr className='text-chiliRed'/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseHistoryComponent;