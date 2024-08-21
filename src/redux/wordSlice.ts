import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { WordDTO, WordMeta, WordSources } from '../dto';

// Define a type for the slice state
export interface Word {
  ID: string;
  source: WordSources;
  originalUrl: string;
  text: string;
}

export interface WordState {
  words: Word[]
}

// Define the initial state using that type
export const initialState: WordState = {
  words: [
  ],
}

export const wordSlice = createSlice({
  name: 'words',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    replace: (state: WordState, action: PayloadAction<WordDTO[]>) => {
      console.log('action')
      console.log(action)
      state.words = action.payload.map((wordDto) => {
        const word: Word = {
          ID: wordDto.ID,
          source: wordDto.source,
          originalUrl: wordDto.originalUrl,
          text: wordDto.text,
        }

        return word;
      });
    },
  },
})

export const { replace } = wordSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectWords = (state: RootState) => state.words

export default wordSlice.reducer