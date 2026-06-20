import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../reducers/bookReducer'
import errorReducer from './errorSlice'
// import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    book: bookReducer,
    error: errorReducer,
    // middleware: [thunk],
  },
})