import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";

export default class TopNews extends React.Component {
    constructor(props) {
    super(props);
    // Don't call this.setState() here!
     this.state = { 
         title:"Test",
         articles: [],
         headline:{}, 
         headlines:[]

    };
    //this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        console.log("Mount !!!");
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
        axios.post(process.env.REACT_APP_API_URL + "/api/homedata",param,{headers:headers})
        .then((res) => {
            // Set state with result
            console.log("res",res);

            this.setState(
            {
                headline:res.data.head_articles.slice(0,1)[0],
                headlines:res.data.head_articles.slice(0,4),
                articles:res.data.articles
            });
            
            console.log("Headlines",this.state.headlines[0]);
            console.log("Articles",this.state.articles);


        })
        .catch(function (error) {
          if (error.response) {
            console.error(error);
          }
        });
        
    }

    render(){
        const {headlines} = this.state;
           return (
            <div class="top-news">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 tn-left">
                        <div class="tn-img">
                            <img src={this.state.headline.picture} className="img-thumbnail"/>
                            <div class="tn-content">
                                <div class="tn-content-inner">
                                    <a class="tn-date"><i class="far fa-clock"></i>{(new Date(this.state.headline.created_at)).toLocaleDateString()}</a>
                                    <a class="tn-title" href={'detail/' + this.state.headline.id + '/' + this.state.headline.title}>{this.state.headline.title}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 tn-right">
                        <div class="row">

                        { headlines &&  headlines.map((article, index) => (
                            <div class="col-md-6">
                                <div class="tn-img article-card">
                                    <img src={article.picture} className="img-thumbnail"/>
                                    <div class="tn-content">
                                        <div class="tn-content-inner">
                                            <a class="tn-date"><i class="far fa-clock"></i>{(new Date(article.created_at)).toLocaleDateString()}</a>
                                            <a class="tn-title" href={'detail/' + article.id + '/' + article.title}>{article.title}</a>
                                        </div>
                                    </div>
                                </div>
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
