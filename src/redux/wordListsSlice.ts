import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { SenseListDto, WordDTO, WordMeta, WordSources } from '../dto';
import { act } from 'react';

export interface WordListsState {
  lists: SenseListDto[],
  activeListId: null | string;
}

export interface DeleteWordListPayload {
  wordListId: string;
}

// Define the initial state using that type
export const initialState: WordListsState = {
  lists: [],
  activeListId: null,
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
    deleteLine: (state: WordListsState, action: PayloadAction<{ listId: string, lineId: string }>) => {
      const list = state.lists.find((list) => list.ID === action.payload.listId)

      if (!list) return;
      list.senseLines = list.senseLines.filter((line) => line.ID !== action.payload.lineId)
    },
    replaceOne: (state: WordListsState, action: PayloadAction<SenseListDto>) => {
      state.lists = state.lists.map((list) => {
        if (list.ID === action.payload.ID) {
          return action.payload;
        } else {
          return list;
        }
      });
    },
    delete: (state: WordListsState, action: PayloadAction<DeleteWordListPayload>) => {
      state.lists = state.lists.filter((senseList) => senseList.ID !== action.payload.wordListId)
    },
    setActiveListId: (state: WordListsState, action: PayloadAction<string>) => {
      state.activeListId = action.payload;
    },
  },
})

export const { replace } = wordListsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLists = (state: RootState) => state.lists.lists
export const selectActiveListId = (state: RootState) => state.lists.activeListId

export default wordListsSlice.reducer