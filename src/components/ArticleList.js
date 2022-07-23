import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";
import Article from "./Article";

export default class ArticleList extends React.Component {
    constructor(props) {
    super(props);
    // Don't call this.setState() here!
        this.state = { 
            articles:[],
            name:"",
        };
    //this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        
        let path = window.location.pathname;
        console.log(window.location);

        let pathval = path.split("/");
        console.log("pathVal",pathval);
        let type = pathval[1];
        let param = {};
        if(type == "tags")

            param.id = parseInt(pathval[2]);

        else if(type == "search"){

            const queryString = window. location. search;
            console.log(queryString);

            const parameters = new URLSearchParams(queryString);
            const value = parameters. get('keyword');
            param.keyword = value;

        }else if(type == "latest"){
            this.name = "Latest Articles";

        }else if(type == "popular"){
            this.name = "Popular Articles";
        }
        
        this.loadData(param);
    }

    loadData(param){

        let self = this;
        let headers;
        headers = {

        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_TOKEN

        }

        console.log("param",param);

        axios.post(process.env.REACT_APP_API_URL + "/api/articles",param,{headers:headers})
        .then((res) => {
            // Set state with result
            let name = this.name;
            if(res.data.data.name){
                name = res.data.data.name;
            }

            self.setState(
            {
                "articles":res.data.articles,
                "name":name
            });
        })
        .catch(function (error) {
          if (error.response) {
            console.error(error);
          }
        });
        
    }
    render(){
        return(
            <div class="cat-news mt-3">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h2><i class="fas fa-align-justify"></i>{this.state.name}</h2>
                        <div class="row cn-slider">

                            { this.state.articles.map((article, index) => (
                                <div class="col-md-3">
                                    <Article article={article}/>
                                </div>
                            ))}

                        </div>
                    </div>
            
                </div>
            </div>
        </div>
        )
    }
}    
