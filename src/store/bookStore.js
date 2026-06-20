import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../reducers/bookReducer'
// import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    book: bookReducer,
    // middleware: [thunk],
  },
})