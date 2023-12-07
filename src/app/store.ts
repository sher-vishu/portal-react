import { configureStore } from '@reduxjs/toolkit'
import  matchDataSlice from "../features/match/matchDataSlice";
import { useDispatch } from "react-redux";

type AppThunkExtra = {};

const store = configureStore({
  reducer: {
    matchData: matchDataSlice,
  },
  devTools: {
    name: "MatchDataApp",
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppAsyncThunkConfig = {
  state: AppState;
  dispatch: AppDispatch;
  extra: AppThunkExtra;
};

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export default store;