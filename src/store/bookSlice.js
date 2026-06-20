import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
      state.error = null;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBooks,
  addBook,
  updateBook,
  deleteBook,
  setLoading,
  setError,
} = bookSlice.actions;

export default bookSlice.reducer;
