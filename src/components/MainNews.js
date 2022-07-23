import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";

export default class MainNews extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
         this.state = { 
             articles: [],
             article:{},
        };
        //this.handleClick = this.handleClick.bind(this);
        }
        
        componentDidMount(){
            console.log("Mount !!!");
            this.loadData();
            this.getTags();
        }
        getTags(){
            
            let self = this;
            let headers;
            headers = {
    
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_API_TOKEN
    
            }
            
            let param = {}
            axios.post(process.env.REACT_APP_API_URL + "/api/tags",param,{headers:headers})
            .then((res) => {
                // Set state with result
                this.setState(
                {
                    tags:res.data.tags,
                    
                });
    
            })
            .catch(function (error) {
              if (error.response) {
                console.error(error);
              }
            });
            
        }

        loadData(){
            
            let self = this;
            let headers;
            headers = {
    
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_API_TOKEN
    
            }
            
            let param = {}
            axios.post(process.env.REACT_APP_API_URL + "/api/articles",param,{headers:headers})
            .then((res) => {
                // Set state with result
                this.setState(
                {
                    article:res.data.articles.slice(0,1)[0],
                    articles:res.data.articles.slice(0,5)
                    
                });
                console.log("Article",this.state.article);
    
    
            })
            .catch(function (error) {
              if (error.response) {
                console.error(error);
              }
            });
            
        }
    render(){
           return (
            // <!-- Main News Start-->
            <div class="main-news">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12">
                                    <h2><i class="fas fa-align-justify"></i>Latest News</h2>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mn-img">
                                                <img src={this.state.article.picture} />
                                            </div>
                                            <div class="mn-content">
                                                <a class="mn-title" href={'detail/' + this.state.article.id + '/' + this.state.article.title}>{this.state.article.title}</a>
                                                <a class="mn-date" href=""><i class="far fa-clock"></i>05-Feb-2020</a>
                                                <p>
                                                    {this.state.article.sub_title}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            { this.state.articles &&  this.state.articles.map((article, index) => (
                                            <div class="mn-list">
                                                <div class="mn-img">
                                                    <img src={article.picture} />
                                                </div>
                                                <div class="mn-content">
                                                    <a class="mn-title" href={'detail/' + article.id + '/' + article.title}>{article.title}</a>
                                                    <a class="mn-date" ><i class="far fa-clock"></i>{article.created_at}</a>
                                                </div>
                                            </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <h2><i class="fas fa-align-justify"></i>Popular News</h2>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mn-img">
                                                <img src={this.state.article.picture} />
                                            </div>
                                            <div class="mn-content">
                                                <a class="mn-title" href={'detail/' + this.state.article.id + '/' + this.state.article.title}>{this.state.article.title}</a>
                                                <a class="mn-date" ><i class="far fa-clock"></i>05-Feb-2020</a>
                                                <p>
                                                {this.state.article.sub_title}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            { this.state.articles &&  this.state.articles.map((article, index) => (
                                                <div class="mn-list">
                                                    <div class="mn-img">
                                                        <img src={article.picture} />
                                                    </div>
                                                    <div class="mn-content">
                                                        <a class="mn-title" href={'detail/' + article.id + '/' + article.title}>{article.title}</a>
                                                        <a class="mn-date" ><i class="far fa-clock"></i>{article.created_at}</a>
                                                    </div>
                                                </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="col-md-4">
                            <div class="sidebar">
                                <div class="sidebar-widget">
                                    <h2><i class="fas fa-align-justify"></i>Category</h2>
                                    <div class="category">
                                        <ul class="fa-ul">
                                        { this.state.tags &&  this.state.tags.map((tag, index) => (
                                                <li><span class="fa-li"><i class="far fa-arrow-alt-circle-right"></i></span><a href="">{tag.name}</a></li>
                                            ))}
                                           
                                        </ul>
                                    </div>
                                </div>
    
                                <div class="sidebar-widget">
                                    <h2><i class="fas fa-align-justify"></i>Tags</h2>
                                    <div class="tags">
                                    { 
                                    this.state.tags &&  this.state.tags.map((tag, index) => (
                                        <a href={'tags/' + tag.id + '/' + tag.name}>{tag.name}</a>
                                    ))}
                                    </div>
                                </div>
    
                                <div class="sidebar-widget">
                                    <h2><i class="fas fa-align-justify"></i>Ads 1 column</h2>
                                    <div class="image">
                                        <a href=""><img src="img/adds-1.jpg" alt="Image"/></a>
                                    </div>
                                </div>
    
                                <div class="sidebar-widget">
                                    <h2><i class="fas fa-align-justify"></i>Ads 2 column</h2>
                                    <div class="image">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <a href=""><img src="img/adds-2.jpg" alt="Image"/></a>
                                            </div>
                                            <div class="col-sm-6">
                                                <a href=""><img src="img/adds-2.jpg" alt="Image"/></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
           )
        
    }
}    
