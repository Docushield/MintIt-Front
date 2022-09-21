import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        isMintConfirmDialog: false,
    },
    reducers: {
        toggleMintConfirmDialog: (state) => {
            state.isMintConfirmDialog = !state.isMintConfirmDialog;
        },
    },
});

// export default the store
export default collectionSlice.reducer;

// export the action
export const { toggleMintConfirmDialog } = collectionSlice.actions;
