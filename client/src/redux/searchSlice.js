import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
    searchResults: [],

  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
   
  },
});

export const { setSearchText, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
