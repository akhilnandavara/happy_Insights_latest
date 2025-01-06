// redux/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: '',
  showFavorites: false,
  showTop10: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    toggleFavorites(state) {
      state.selectedDate = '';
      state.showTop10 = false;
      state.showFavorites = !state.showFavorites;
    },
    toggleTop10(state) {
      state.selectedDate = '';
      state.showFavorites = false;
      state.showTop10 = !state.showTop10;
    },
    resetFilters(state) {
      state.selectedDate = '';
      state.showFavorites = false;
      state.showTop10 = false;
    },
  },
});

export const {
  setSelectedDate,
  toggleFavorites,
  toggleTop10,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
