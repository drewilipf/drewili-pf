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
          {purchaseHistory.map((purchase) => (
            <li
              key={purchase.purchaseId}
              className="flex items-center justify-between py-3 border-b border-chiliRed"
            >
              <div className="flex items-center space-x-4 flex-wrap md:items-center justify-center">
                <img
                  src={purchase.productImage}
                  alt={purchase.productName}
                  className="w-36 h-36 rounded-md"
                />
                <div>
                  <p className="text-lg font-semibold ">{purchase.productName}</p>
                  <p>Precio: ${purchase.productPrice}</p>
                  <p>Cantidad: {purchase.quantity}</p>
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseHistoryComponent;