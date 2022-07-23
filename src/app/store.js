import { configureStore } from '@reduxjs/toolkit'
import invoicesReducer from '../reducer/invoices/invoicesSlice.js'


export default configureStore({
  reducer: {
    invoices: invoicesReducer
  }
})