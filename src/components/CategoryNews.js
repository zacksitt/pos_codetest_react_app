import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";
import Article from "./Article";

export default class CategoryNews extends React.Component {
    constructor(props) {
    super(props);
    // Don't call this.setState() here!
        this.state = { 
            cat_articles:[]
        };
    //this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        console.log("Mount !!!");
        let tags 
        this.loadData();
    }

    loadData(){
        let self = this;
        let headers;
        headers = {

        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_TOKEN

        }
        
        let param = {}
        axios.post(process.env.REACT_APP_API_URL + "/api/cat-articles",param,{headers:headers})
        .then((res) => {
            // Set state with result
            this.setState(
            {
                cat_articles:res.data.data
            });
            console.log("Cat articles",this.state.cat_articles);

        })
        .catch(function (error) {
          if (error.response) {
            console.error(error);
          }
        });
        
    }
    render(){
        return(
            <div class="cat-news">
            <div class="container-fluid">
                <div class="row">
                { this.state.cat_articles &&  this.state.cat_articles.map((cat, index) => (
                    <div class="col-md-6">
                        <h2><i class="fas fa-align-justify"></i>{cat.name}</h2>
                        <div class="row cn-slider">

                            { cat.articles.map((article, index) => (
                                <div class="col-md-6">
                                    <Article article={article}/>
                                </div>
                            ))}

                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        )
    }
}    
