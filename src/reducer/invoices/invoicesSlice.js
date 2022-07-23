import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices:[]
  },
  reducers: {
    fetch: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

    },
    update: state => {

    },
    add: (state, action) => {

        console.log("Add to invoice");
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInvoices.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
       // state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log("fullfilled");
        state.invoices = state.invoices.concat(action.payload)
      })
      .addCase(addNewInvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload)
      })
    
  },
})

export const selectAllInvoices = (state) => state.invoices.invoices
export const getProducts = (state) => {
    return [{"name":"IPhone"},{"name":"Samsung"},{"name":"One Plus"},{"name":"Xaimi"}];
}
export const setProducts = (products) => {
    console.log("setProducts",products);
    return products
}

export const fetchInvoices = createAsyncThunk('invoices/fetInvoices', async () => {

    //const response = await client.get('/fakeApi/posts')
    //return response.data
    console.log("fetchInvoices");
    return [{id:1,customer_name:"Aung Aung",saleperson_name:"Su Zar",date:"22/07/2022",myproducts:[{name:"IPhone"}]}];
})

export const addNewInvoice = createAsyncThunk(
    'invoices/addNewInvoice',
    async (initialInvoice) => {

        console.log("new invoice",initialInvoice);
        //const response = await client.post('/fakeApi/posts', initialPost)
        //return response.data
        return initialInvoice
    }
  )

export const { fetch, update, add } = invoicesSlice.actions

export default invoicesSlice.reducer