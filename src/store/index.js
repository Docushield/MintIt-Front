import { configureStore } from "@reduxjs/toolkit";

import walletReducer from "./wallet.module";

const store = configureStore({
    reducer: {
        wallet: walletReducer,
    },
});

export default store;
