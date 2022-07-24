import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices:[],
    myproducts:[],
    chartdata:[],
    totalCount:0,
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
        console.log("fullfilled",action.payload);
        state.invoices = [];
        state.invoices = state.invoices.concat(action.payload.data)
        state.totalCount = action.payload.totalCount;
      })
       
      .addCase(addNewInvoice.fulfilled, (state, action) => {
        state.invoices.unshift(action.payload)
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartdata = action.payload
      })
    
  },
})

export const getTotalCount = (state) => state.invoices.totalCount
export const selectAllInvoices = (state) => state.invoices.invoices
export const selectAllMyproducts = (state) => state.invoices.myproducts
export const selectChartData = (state) => state.invoices.chartdata
export const getProducts = (state) => {
    return [
        {"name":"iPhone 13 Pro","image":"https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_13_pro__ezrebuldmju6_large.jpg","price":999,"stock":2},
        {"name":"iPhone 13","image":"https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_13_pro__ezrebuldmju6_large.jpg","price":699,"stock":24},
        {"name":"iPhone SE","image":"https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_se__fifp7zy8jlaq_large.jpg","price":429,"stock":55},
        {"name":"iPhone 12","image":"https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_12__fk7mpufyl1u2_large.jpg","price":599,"stock":100}
    ];
}
export const setProducts = (products) => {
    console.log("setProducts",products);
    return products
}

export const fetchInvoices = createAsyncThunk('invoices/fetInvoices', async (pagenum) => {

    let headers;
    headers = {

    'Content-Type': 'application/json',
    'Authorization': process.env.REACT_APP_API_TOKEN

    }
    let param = {
      count:10,
      pagenum:pagenum
    }
    let res = await axios.post(process.env.REACT_APP_API_URL + "/auth/invoices",param,{headers:headers});
    return res.data;

   // return [{id:1,customer_name:"Aung Aung",saleperson_name:"Su Zar",date:"22/07/2022",myproducts:[{name:"IPhone"}]}];
})

export const fetchChartData = createAsyncThunk('invoices/fetchChartData', async (timerange) => {

  let headers;
  headers = {

  'Content-Type': 'application/json',
  'Authorization': process.env.REACT_APP_API_TOKEN

  }
  let param = {
    timerange
  }
  let res = await axios.post(process.env.REACT_APP_API_URL + "/auth/invoice/report",param,{headers:headers});
  return res.data.data;
 // return [{id:1,customer_name:"Aung Aung",saleperson_name:"Su Zar",date:"22/07/2022",myproducts:[{name:"IPhone"}]}];
})

export const addNewInvoice = createAsyncThunk(
    'invoices/addNewInvoice',
    async (initialInvoice) => {

        console.log("new invoice",initialInvoice);
        //const response = await client.post('/fakeApi/posts', initialPost)
        //return response.data
        //return initialInvoice
        let headers;
        headers = {

        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_TOKEN

        }
        let param = {
          count:5,
          pagenum:1
        }
        let res = await axios.post(process.env.REACT_APP_API_URL + "/auth/invoice",initialInvoice,{headers:headers});
        return res.data.data;
    }
  )

export const { fetch, update, add } = invoicesSlice.actions

export default invoicesSlice.reducer