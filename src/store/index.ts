import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import Cookies from "cookies-js";
import CookieStorage from "./cookie";
import auth from "./auth";
import onboarding from "./onboarding";
import userExistingReducer from "./user";
import { Api } from "@/_services/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from "react-redux";
import { initialUserExistingState } from "./user";

const cookieStorage = new CookieStorage(Cookies, {
  keyPrefix: "seeds.",
  setCookieOptions: { path: "/" },
});

const USER_EXISTING_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const userExistingTTLTransform = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    __persistedAt: Date.now(),
  }),
  (outboundState: any) => {
    const persistedAt = outboundState?.__persistedAt ?? 0;
    const isExpired = Date.now() - persistedAt > USER_EXISTING_TTL_MS;
    if (isExpired) return initialUserExistingState;
    const { __persistedAt, ...rest } = outboundState;
    return rest;
  },
  { whitelist: ["userExisting"] }
);

const userExistingPersistConfig = {
  key: "userExisting",
  storage: cookieStorage,
  transforms: [userExistingTTLTransform],
};

const reducers = combineReducers({
  auth,
  onboarding,
  userExisting: persistReducer(userExistingPersistConfig, userExistingReducer),
  [Api.reducerPath]: Api.reducer,
});

const persistConfig = {
  key: "seeds-ui-new",
  storage: new CookieStorage(Cookies, {
    keyPrefix: "seeds.",
    setCookieOptions: { path: "/" },
  }),
  whitelist: ["auth", "onboarding", "userExisting"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(Api.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof reducers>;
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store, persistor };
