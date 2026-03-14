import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    name: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    instructions: "",
  },

  reducers: {
    updateCheckoutDetails: (state, action) => {
      const { name, email, phone, pincode, address, instructions } = action.payload;

      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (phone !== undefined) state.phone = phone;
      if (pincode !== undefined) state.pincode = pincode;
      if (address !== undefined) state.address = address;
      if (instructions !== undefined) state.instructions = instructions;
    },

    clearCheckout: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.pincode = "";
      state.address = "";
      state.instructions = "";
    },
  },
});

export const { updateCheckoutDetails, clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
