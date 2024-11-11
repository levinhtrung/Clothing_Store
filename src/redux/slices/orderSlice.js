import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
  shippingAddres: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderProduct: (state, action) => {
      state.orderItems = action.payload?.dataCart || [];
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?._id === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?._id === idProduct
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?._id === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?._id === idProduct
      );
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state?.orderItems?.forEach((order) => {
        if (listChecked.includes(order._id + `size${order.size}`)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSelected = orderSelected;
      console.log("selected", state.orderItemsSelected);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateOrderProduct,
  increaseAmount,
  decreaseAmount,
  selectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
