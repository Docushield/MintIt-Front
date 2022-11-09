import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        current: null,
        isTokenSaleDialog: false,
    },
    reducers: {
        setCurrentToken: (state, action) => {
            state.current = action.payload;
        },
        toggleTokenSaleDialog: (state) => {
            state.isTokenSaleDialog = !state.isTokenSaleDialog;
        },
    },
});

// export default the store
export default tokenSlice.reducer;

// export the action
export const { setCurrentToken, toggleTokenSaleDialog } =
    tokenSlice.actions;
