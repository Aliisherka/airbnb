import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
// import { checkAuthThunk } from '../../widgets/user/user-model';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
})
// store.dispatch(checkAuthThunk());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
