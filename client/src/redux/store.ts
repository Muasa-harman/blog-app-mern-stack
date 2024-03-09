import {configureStore,combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";
import userSlice from "@src/redux/user/userSlice";
import themeSlice from "@src/redux/theme/themeSlice";

const rootReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer:persistedReducer,
        middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);