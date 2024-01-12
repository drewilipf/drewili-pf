import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseHistory } from "../../reduxToolkit/PurchaseHistory/purchaseHistoryThunks";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import CommentInput from '../../Components/DetailComponents/CommentInput';

import { setAverageStars } from '../../reduxToolkit/Comment/commentSlice';


const PurchaseHistoryComponent = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const purchaseHistory = useSelector((state) => state.purchaseHistory.data);
  const loading = useSelector((state) => state.purchaseHistory.loading);
  const error = useSelector((state) => state.purchaseHistory.error);

  useEffect(() => {
    dispatch(getPurchaseHistory(userId));
  }, [dispatch, userId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const groupProductsByDate = (purchaseHistory) => {
    const groupedByDate = {};
    purchaseHistory.forEach((purchase) => {
      const dateKey = purchase.date; // Adjust according to the date format you receive
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(purchase);
    });

    return Object.values(groupedByDate);
  };


  const [showModal, setShowModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const openModal = (purchase) => {
    setSelectedPurchase(purchase);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPurchase(null);
  };

  const handleCommentPosted = (rating) => {
    closeModal();
    console.log('Rating from CommentInput:', rating);
    dispatch(getPurchaseHistory(userId));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    console.log(dateString);
    return new Date(dateString).toLocaleDateString(undefined, options);

  };

  if (loading) {
    return <p className="text-black">Cargando historial de compras...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error al cargar el historial de compras: {error}
      </p>
    );
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
              <p className="font-bold">
                Fecha de Compra: {formatDate(group[0].date)}
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
                    <div className="p-2 rounded shadow-sm shadow-eerieBlack">
                      <NavLink
                        to={`/detail/${purchase.productId}`}
                        className="flex items-center space-x-4"
                      >
                        <h3 className="hover:scale-105">Volver a comprar</h3>
                      </NavLink>
                      <hr className="text-chiliRed" />

                      <button
                        onClick={() => openModal(purchase)}
                        className={`cursor-pointer hover:scale-105 hover:drop-shadow-sm hover:shadow-onyx ${
                          showModal && 'opacity-50 cursor-not-allowed'
                        }`}
                        disabled={showModal}
                      >
                        Opinar
                      </button>

                    </div>
                  </li>
                ))}
              </ul>
              <hr className="text-chiliRed" />
            </li>
          ))}
        </ul>
      )}

{showModal && selectedPurchase && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Opinar sobre {selectedPurchase.productName}
      </h3>
      {/* Elimina el código relacionado con StarRating */}
      <CommentInput
        user_id={userId}
        product_id={selectedPurchase.productId}
        onCommentPosted={handleCommentPosted}
        // Puedes pasar cualquier prop adicional necesario aquí
      />
      <button onClick={closeModal} className="mt-4 text-chiliRed hover:underline">
        Cerrar
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default PurchaseHistoryComponent;
