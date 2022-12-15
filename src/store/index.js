import { configureStore } from "@reduxjs/toolkit";

import walletReducer from "./wallet.module";
import collectionReducer from "./collection.module";
import tokenReducer from "./token.module";

const store = configureStore({
    reducer: {
        wallet: walletReducer,
        collection: collectionReducer,
        token:tokenReducer
    },
});

export default store;
