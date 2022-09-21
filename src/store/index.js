import { configureStore } from "@reduxjs/toolkit";

import walletReducer from "./wallet.module";
import collectionReducer from "./collection.module";

const store = configureStore({
    reducer: {
        wallet: walletReducer,
        collection: collectionReducer,
    },
});

export default store;
