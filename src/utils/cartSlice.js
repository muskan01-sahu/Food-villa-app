import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items:[],
    },
    reducers:{
        addItem: (state,action) =>{
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1; // Increase quantity if already in cart
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        removeItem: (state,action)=>{
            // Remove item by index
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        increasesQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) item.quantity += 1;
        },

        decreasesQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },

        clearCart:(state)=>{
            state.items=[];
        },
    },
});


export const { addItem,removeItem,increasesQuantity,decreasesQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;