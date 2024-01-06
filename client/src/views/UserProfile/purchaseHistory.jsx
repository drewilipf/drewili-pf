import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseHistory } from '../../reduxToolkit/purchaseHistory/purchaseHistoryThunks';
import { useParams } from 'react-router-dom';

const PurchaseHistoryComponent = () => {
  const dispatch = useDispatch();
  const { userId } = useParams()
  console.log(userId, 'id del historial');
  const purchaseHistory = useSelector((state) => state.purchaseHistory.data);  // This is where the error is occurring
  const loading = useSelector((state) => state.purchaseHistory.loading);
  const error = useSelector((state) => state.purchaseHistory.error);
  useEffect(() => {
    dispatch(getPurchaseHistory(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <p>Cargando historial de compras...</p>;
  }

  if (error) {
    return <p>Error al cargar el historial de compras: {error}</p>;
  }

  return (
    <div>
      <h2>Historial de Compras</h2>
      {purchaseHistory.length === 0 ? (
        <p>No hay compras registradas para este usuario.</p>
      ) : (
        <ul>
          {purchaseHistory.map((purchase) => (
            <li key={purchase.purchaseId}>
              <p>Producto: {purchase.productName}</p>
              <p>Precio: ${purchase.productPrice}</p>
              <p>Cantidad: {purchase.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseHistoryComponent;