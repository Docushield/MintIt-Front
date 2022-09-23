import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        current: null,
        isMintConfirmDialog: false,
    },
    reducers: {
        setCurrentCollection: (state, action) => {
            state.current = action.payload;
        },
        toggleMintConfirmDialog: (state) => {
            state.isMintConfirmDialog = !state.isMintConfirmDialog;
        },
    },
});

// export default the store
export default collectionSlice.reducer;

// export the action
export const { setCurrentCollection, toggleMintConfirmDialog } =
    collectionSlice.actions;
