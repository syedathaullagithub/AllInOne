import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'Books',
  initialState: {
    books: []
  },
  reducers: {
    addbook: (state, action) => {
        state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const { id, updatedBook } = action.payload;
      const index = state.books.findIndex(book => book.id === id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook };
      }
    },
    deleteBook  : (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addbook, updateBook, deleteBook } = counterSlice.actions

export default counterSlice.reducer