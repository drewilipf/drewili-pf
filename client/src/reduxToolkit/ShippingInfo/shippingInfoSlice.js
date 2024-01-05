import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shippingInfo: {},
    dropshippingInfo: {},
    opcionSeleccionadaPedido: "opcion1",
    opcionSeleccionadaComprobante: "opcion1",
    razonSocial: "",
    ruc: "",
    modalidadPago: "transferenciaBancaria",
  },
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setDropshippingInfo: (state, action) => {
      state.dropshippingInfo = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingInfo.address = action.payload;
    },
    updateDropshippingAddress: (state, action) => {
      state.dropshippingInfo.address = action.payload;
    },
    setPedidoOption: (state, action) => {
      state.opcionSeleccionadaPedido = action.payload;
    },
    setComprobanteOption: (state, action) => {
      state.opcionSeleccionadaComprobante = action.payload;
    },
    setRazonSocialSlice: (state, action) => {
      state.razonSocial = action.payload;
    },
    setRucSlice: (state, action) => {
      state.ruc = action.payload;
    },
    setModalidadPagoSlice: (state, action) => {
      state.modalidadPago = action.payload;
    },
  },
});

export const {
  setShippingInfo,
  setDropshippingInfo,
  updateShippingAddress,
  updateDropshippingAddress,
  setPedidoOption,
  setComprobanteOption,
  setRazonSocialSlice,
  setRucSlice,
  setModalidadPagoSlice,
} = shippingSlice.actions;
export default shippingSlice.reducer;
