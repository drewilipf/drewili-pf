import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { putStatus } from "../../../reduxToolkit/PurchaseHistory/purchaseHistoryThunks";

import { AiOutlineClose } from "react-icons/ai";

const EditPurchaseModal = ({ onClose, purchaseIds }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSaveChanges = () => {
    console.log(purchaseIds);
    console.log(selectedStatus);
    const status = {
      newPaymentStatus: selectedStatus,
    };
    console.log(status);
    const response = dispatch(putStatus(purchaseId, status));

    console.log(response);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md w-full md:w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Editar Estado de Pago</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
        <label
          htmlFor="statusSelect"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Seleccionar Estado:
        </label>
        <select
          id="statusSelect"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-chiliRed"
        >
          <option value="aprobado">Aprobado</option>
          <option value="pendiente">Pendiente</option>
          <option value="rechazado">Rechazado</option>
        </select>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-chiliRed text-white rounded-md hover:bg-onyx focus:outline-none focus:ring "
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-chiliRed  text-white rounded-md hover:bg-onyx focus:outline-none focus:ring "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPurchaseModal;
