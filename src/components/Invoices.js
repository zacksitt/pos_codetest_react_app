import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";
import Article from "./Article";
import { useSelector, useDispatch } from 'react-redux'
import {
  fetch,
  selectAllInvoices,
  add,
  update,
  fetchInvoices,
  addNewInvoice,
  getProducts,
  setProducts
} from '../reducer/invoices/invoicesSlice'

const InvoiceRow = ({ invoice }) => {
    return (
        <tr>
            <th scope="row">{invoice.id}</th>
            <td>{invoice.customer_name}</td>
            <td>{invoice.saleperson_name}</td>
            <td>{invoice.date}</td>
            <td> 
                {
                    invoice.myproducts.map((myproduct,index) => (
                        <span>{myproduct.name}</span>
                    ))
                }
            </td>
        </tr>

    )
  }

export const Invoices = () => {
    
    const [customer_name, setCustomerName] = useState('')
    const [saleperson_name, setSalepersonName] = useState('')
    const [date, setDate] = useState('')
    const [produc_name,setProductName] = useState('')
    const [products,setProducts] = useState([]);
    const [myproducts,setMyProducts] = useState([]);

    const onCustomerChange = (e) => setCustomerName(e.target.value)
    const onSalePersonChange = (e) => setSalepersonName(e.target.value)
    const onDateChange = (e) => setDate(e.target.value)
    let allproducts = useSelector(getProducts)

    const onProductNameChange = (e) => {
        
        let noProducts = [];

        for (const p of allproducts) {
            if(p.name.includes(e.target.value)){
                noProducts.push(p);
            }
        }
        setProducts(noProducts)
        setProductName(e.target.value);
    }

    
    const invoices = useSelector(selectAllInvoices)
    const dispatch = useDispatch()

    useEffect(() => {
          dispatch(fetchInvoices())
      }, [dispatch])

    console.log("fetch invoices",invoices);
    let content = invoices.map((i) => (
        <InvoiceRow key={i.id} invoice={i} />
      ))
    
    const onChoose = async (myproduct) => {
            try {

                myproducts.push(myproduct);
                setMyProducts(myproducts);
                console.log("my products",myproducts);

            } catch (err) {
                    console.error('Failed to save the post: ', err)
            } finally {

        }
    }

    const onSavePostClicked = async () => {
        console.log("on click");
        try {

                await dispatch(addNewInvoice({ customer_name, saleperson_name, date,myproducts})).unwrap()
                setCustomerName('')
                setSalepersonName('')
                setDate('')
        
        } catch (err) {
                console.error('Failed to save the post: ', err)
        } finally {

        }
    }
    
    return (
        <div class="invoices mt-3">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div className="content-head mb-3">
                        <h2>Invoices </h2>
                        {/* <a className="btn btn-success btn-lg" onClick={() => dispatch(add())}> + Add New </a> */}
                    </div>
                    <hr></hr>
                    <div className="content-form">
                    <form>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Customer name</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword" placeholder="customer name"  onChange={onCustomerChange}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Sale person name</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword" placeholder="sale person name"  onChange={onSalePersonChange}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Date</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword" placeholder="date"  onChange={onDateChange}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Products</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPassword" placeholder="products"  onChange={onProductNameChange}/>
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
                            </div>
                            
                        </div>
                        <div class="form-group row">
                            <a className="btn btn-success btn-lg text-light" onClick={onSavePostClicked}><i className="save"></i> Save</a>
                        </div>
                        </form>
                    </div>

                    <hr></hr>
                    <div className="content-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Customer name</th>
                                    <th scope="col">Sale person name</th>
                                    <th scope="col">Sale date</th>
                                    <th scope="col">Products</th>
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