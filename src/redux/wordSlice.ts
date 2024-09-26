import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { WordDTO, WordMeta, WordSources } from '../dto';

export interface WordState {
  words: WordDTO[],
  chosenWord: WordDTO | null,
  chosenWordIsLoading: boolean,
}

// Define the initial state using that type
export const initialState: WordState = {
  words: [
  ],
  chosenWord: null,
  chosenWordIsLoading: false
}

export const wordSlice = createSlice({
  name: 'words',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    replace: (state: WordState, action: PayloadAction<WordDTO[]>) => {
      state.words = action.payload.map((wordDto) => {
        return wordDto;
      });
    },
    delete: (state: WordState, action: PayloadAction<string>) => {
      state.words = state.words.filter((word) => word.ID !== action.payload);
    },
    clearWords: (state: WordState) => {
      state.words = []
    },
    setChosenWord: (state: WordState, action: PayloadAction<WordDTO>) => {
      state.chosenWord = action.payload
    },
    clearChosenWord: (state: WordState) => {
      state.chosenWord = null
    },
    setChosenWordIsLoading: (state: WordState, action: PayloadAction<boolean>) => {
      state.chosenWordIsLoading = action.payload
    },
  },
})

export const { replace } = wordSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectWords = (state: RootState) => state.words.words
export const selectChosenWord = (state: RootState) => state.words.chosenWord
export const selectChosenWordIsLoading = (state: RootState) => state.words.chosenWordIsLoading

export default wordSlice.reducer