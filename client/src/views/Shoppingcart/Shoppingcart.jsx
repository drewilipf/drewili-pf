import React from 'react';

const SalesCart = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
      
      <div className="flex items-center justify-between border-b border-gray-700 py-2">
        <span className="flex-1">Nombre del Producto</span>
        <span className="w-16 text-right">Precio</span>
      </div>
      {/* Ejemplos de elementos en el carrito */}
      <div className="flex items-center justify-between py-2">
        <span className="flex-1">Producto 1</span>
        <span className="w-16 text-right">$00.00</span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="text-2xl">$00.00</span>
        </div>
        {/* Boton para realizar el pago */}
        <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded">
          Pagar
        </button>
      </div>
    </div>
  );
};

export default SalesCart;
