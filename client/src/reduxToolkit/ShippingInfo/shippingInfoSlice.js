import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shippingInfo: {},
    dropshippingInfo: {},
    opcionQuienRecibe: "yo",
    opciontipoComprobante: "boleta",
    razonSocialFactura: "",
    rucFactura: "",
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
      state.opcionQuienRecibe = action.payload;
    },
    setComprobanteOption: (state, action) => {
      state.opciontipoComprobante = action.payload;
    },
    setRazonSocialSlice: (state, action) => {
      state.razonSocialFactura = action.payload;
    },
    setRucSlice: (state, action) => {
      state.rucFactura = action.payload;
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
