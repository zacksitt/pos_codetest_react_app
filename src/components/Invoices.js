import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CanvasJSReact from './canvasjs.react';


import {
    
  fetch,
  selectAllInvoices,
  fetchInvoices,
  addNewInvoice,
  getProducts,
  getTotalCount,
  fetchChartData
} from '../reducer/invoices/invoicesSlice'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const InvoiceRow = ({ invoice }) => {

    return (
        <tr>
            <th scope="row">{invoice.id}</th>
            <td>{invoice.customer_name}</td>
            <td>{invoice.saleperson_name}</td>
            <td>{invoice.date}</td>
            <td>{invoice.total_amount}</td>
            {/* <td> 
                {
                    invoice.products.map((myproduct,index) => (
                        <span> 
                            {index > 0 ? ', ':''}
                            {myproduct.name}
                        </span>
                    ))
                }
            </td> */}
        </tr>

    )
  }

export const Invoices = () => {
    
    const [customer_name, setCustomerName] = useState('')
    const [saleperson_name, setSalepersonName] = useState('')
    const [date, setDate] = useState('')
    const [produc_name, setProductName] = useState('')
    const [products, setProducts] = useState([]);
    const [myproducts, setMyProducts] = useState([]);
    const [myproduct_warning,setMyProductWarning] = useState('');
    const [total_amount,setTotalAmount] = useState(0);
    const [timerange,setTimeRange] = useState("daily");
    const [options,setOptions] = useState({})
    const [pagenum,setPageNum] = useState(1);

    const onCustomerChange = (e) => setCustomerName(e.target.value)
    const onSalePersonChange = (e) => setSalepersonName(e.target.value)
    const onDateChange = (e) => setDate(e.target.value)
    let allproducts = useSelector(getProducts)

    const calTotalAmount = () => {

        let total_amount = 0;
        for (const mproduct of myproducts) {
            total_amount = total_amount + mproduct.price;
        }
        setTotalAmount(total_amount);
    }

    const onProductNameChange = (e) => {
        
        setMyProductWarning('')
        let noProducts = [];
        for (const p of allproducts) {
            if(p.name.includes(e.target.value)){
                noProducts.push(p);
            }
        }
        setProducts(noProducts)
        setProductName(e.target.value);
    }

    const removeMyProduct = async (index) => {

        console.log("removeMyProduct",index);
        let newMyProducts = [];
        if(myproducts.length > 1)
            myproducts.splice(index, 1); 
        console.log("myproducts",products);

        setMyProducts(myproducts);
        calTotalAmount();
    }
    
    const invoices = useSelector(selectAllInvoices)
    const totalCount = useSelector(getTotalCount)

    //const chartData = useSelector(selectChartData)

    //const allmyproducts = useSelector(selectAllInvoices)
    const dispatch = useDispatch()

    useEffect(async () => {

          dispatch(fetchInvoices(pagenum))
          let chartData = await dispatch(fetchChartData(timerange)).unwrap()
          createChartOption(chartData,timerange);

      }, [dispatch])
    
    
    const generateDataPoints = (cdata,timerange) => {
        
        console.log("generate",timerange);
        let xValue = {};
        let data = [];
		for (const [index,i] of cdata.entries()) {
            if(timerange == "daily"){
                data.push({x:new Date(i._id),y:i.count})
                xValue.valueFormatString = "YYYY-MM-DD" 
                xValue.title = "Daily";

            }else if(timerange == "weekly"){

                data.push({x:index,y:i.count})
                xValue.prefix = "W";
                xValue.interval = 2;
                xValue.title = "Weekly";
            }else{

                data.push({x:new Date(i.createdDate),y:i.count})
                xValue.valueFormatString = "MMM" 
                xValue.title = "Monthly";
            }
                
		}
        console.log("data",data);
		return {xValue:xValue,dataPoints:data};
	}

    const createChartOption = (chartdata,timerange) => {

        console.log("chartdata",chartdata);
        let data = generateDataPoints(chartdata,timerange);
        console.log("data",data);

        let options = {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Revenue Charts"
            },
            axisX: data.xValue,
            
            data: [{
                type: "area",
                dataPoints: data.dataPoints
            }]
        }
        setOptions(options);
    }
   
   

    let content = invoices.map((i) => (
        <InvoiceRow key={i.id} invoice={i} />
      ))
    
    const onChoose = async (myproduct) => {

            try {

                console.log("onChoose");
                setProductName('')
                myproducts.push(myproduct);
                setMyProducts(myproducts);
                setProducts([])

                calTotalAmount();

            } catch (err) {
                    console.error('Failed to save the post: ', err)
            } finally {

        }
    }

    const onSavePostClicked = async (e) => {
        e.preventDefault()    
        try {
                if(myproducts.length == 0){

                    setMyProductWarning('Pleae add product.');
                }else{

                    await dispatch(addNewInvoice({ customer_name, saleperson_name, date,products:myproducts,total_amount})).unwrap()
                    setCustomerName('')
                    setSalepersonName('')
                    setDate('')
                    setMyProducts([])
                }
                
        
        } catch (err) {
                console.error('Failed to save the post: ', err)
        } finally {

        }
    }

    const onClickTimeRange = async (timerange) => {

        console.log("timerange",timerange);
        setTimeRange(timerange);
        let dd = await dispatch(fetchChartData(timerange)).unwrap()
        createChartOption(dd,timerange);
    }

    const onClickNext = async () => {

        let pnum = pagenum + 1;
        setPageNum(pnum);
        await dispatch(fetchInvoices(pnum)).unwrap();

    }

    const onClickPrivious = async () => {

        let pnum = pagenum - 1;
        setPageNum(pnum);
        await dispatch(fetchInvoices(pnum)).unwrap();
    }
    
    return (
        <div class="invoices mt-3">
        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <div className="content-head mb-3">
                        <h3>Invoices </h3>
                        {/* <a className="btn btn-success btn-lg" onClick={() => dispatch(add())}> + Add New </a> */}
                    </div>
                    <hr></hr>
                    <div className="row">
                  
                    <div className="invoice-form col-md-7">
                        <div className="content-form mt-3">
                        <form onSubmit={onSavePostClicked} method="post" >
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-3 col-form-label">Customer name</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="inputPassword"  value={customer_name} placeholder="customer name"  onChange={onCustomerChange} required/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-3 col-form-label">Sale person name</label>
                                <div class="col-sm-7">
                                <input type="text" class="form-control" id="inputPassword"  value={saleperson_name} placeholder="sale person name"  onChange={onSalePersonChange} required/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-3 col-form-label">Date</label>
                                <div class="col-sm-7">
                                <input type="date" class="form-control" id="inputPassword"  value={date} placeholder="date"  onChange={onDateChange} required/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-3 col-form-label">Products</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="inputPassword"  value={produc_name} placeholder="products"  onChange={onProductNameChange}/>
                                
                                    <div>
                                        <div className="autocomplete-items">
                                            <ul className="list-group">
                                            { products && products.map((product, index) => (
                                                <li key={index}>
                                                    <a className="list-group-item text-dark" onClick={() => onChoose(product)} href="#">{product.name}</a>
                                                </li>
                                            ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {
                                        myproduct_warning != "" ? (
                                            <label className="text-danger text-sm">{myproduct_warning}</label>
                                        ):(
                                            ''
                                        )
                                    }
                                    
                                </div>
                                <div className="col-sm-10">
                                    <div className="product-box row">
                                        { myproducts && myproducts.map((myproduct,index) => (
                                            <div className="col-sm-4">
                                                <div class="card">
                                                    <img class="card-img-top" src={myproduct.image} alt="Card image cap"/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">{myproduct.name}</h5>
                                                        <p class="card-text text-secondary">
                                                            ${myproduct.price} | {myproduct.stock} in stock</p>
                                                        <a href="#" class="btn btn-primary" onClick={() => removeMyProduct(index)} >Remove</a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))    
                                        }
                                    </div>           
                                </div>
                            </div>
                            <div class="form-group row">
                                <button type="submit" className="btn btn-success btn-lg" ><i className="fa fa-save"></i> Save</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary"  onClick={() => onClickTimeRange("daily")} >Daily</button>
                            <button type="button" class="btn btn-secondary" onClick={() => onClickTimeRange("weekly")} >Weekly</button>
                            <button type="button" class="btn btn-secondary" onClick={() => onClickTimeRange("yearly")} >Monthly</button>
                        </div>
                            <CanvasJSChart options = {options} 
                                    /* onRef={ref => this.chart = ref} */
                                />
                    </div>
                    </div>
                   

                    <hr></hr>
                    <div class="btn-group mb-3" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary" disabled={pagenum === 1} onClick={() => onClickPrivious()} ><i className="fa fa-arrow-left"></i> Privious</button>
                            <button type="button" class="btn btn-primary"   disabled={totalCount <= 10 * pagenum}  onClick={() => onClickNext()} >Next <i className="fa fa-arrow-right"></i> </button>
                        </div>
                    <div className="content-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Customer name</th>
                                    <th scope="col">Sale person name</th>
                                    <th scope="col">Sale date</th>
                                    <th scope="col">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                               {content}
                         
                            </tbody>
                        </table>
                    </div>
                    
                </div>
        
            </div>
        </div>
    </div>
    )
  }
  export default Invoices;