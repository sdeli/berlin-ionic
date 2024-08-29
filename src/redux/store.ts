import { configureStore } from '@reduxjs/toolkit';
import { wordSlice, WordState } from './wordSlice';
import { authSlice, AuthState } from './authSlice';  // Correctly import default export
import { wordListsSlice, WordListsState } from './wordListsSlice';

interface AppState {
  auth: AuthState,
  words: WordState,
  lists: WordListsState
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();

const store = configureStore<AppState>({
  reducer: {
    auth: authSlice.reducer,
    words: wordSlice.reducer,
    lists: wordListsSlice.reducer
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
