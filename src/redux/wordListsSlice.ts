import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { SenseListDto, WordDTO, WordMeta, WordSources } from '../dto';

export interface WordListsState {
  lists: SenseListDto[],
}

// Define the initial state using that type
export const initialState: WordListsState = {
  lists: [],
}

export const wordListsSlice = createSlice({
  name: 'wordsList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    replace: (state: WordListsState, action: PayloadAction<SenseListDto[]>) => {
      state.lists = action.payload.map((lists) => {
        return lists;
      });
    },
  },
})

export const { replace } = wordListsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLists = (state: RootState) => state.lists.lists

export default wordListsSlice.reducer