import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";

export default class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        console.log("ID",props.id);
        
        this.state = { 
            article:{},
            tags:[]
        };
        //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){

        let self = this;
        let path = window.location.pathname;
        let pathval = path.split("/");
        let bookid = parseInt(pathval[2]);

        let headers;
        headers = {
    
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_TOKEN

        }
        
        let param = {}
        axios.post(process.env.REACT_APP_API_URL + "/api/article",{article_id:bookid},{headers:headers})
        .then((res) => {
            // Set state with result
            this.setState(
            {
                article:res.data.article,
                
            });
            console.log("article",this.state.article);


        })
        .catch(function (error) {
            if (error.response) {
            console.error(error);
            }
        });
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
            console.log("tags",this.state.tags);


        })
        .catch(function (error) {
          if (error.response) {
            console.error(error);
          }
        });
        
    }

    render(){
        return(
            <div class="single-news">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="sn-img">
                            <img src={this.state.article.picture} />
                        </div>
                        <div class="sn-content">
                            <a class="sn-title" href="">{this.state.article.title}</a>
                            <a class="sn-date" href=""><i class="far fa-clock"></i>{this.state.article.created_at}</a>
                            <p>
                                <pre>
                                    {this.state.article.text}
                                </pre>
                            </p>
                         
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
                                        <a href={'/tags/' + tag.id + '/' + tag.name}>{tag.name}</a>
                                    ))}

                                    
                                </div>
                            </div>

                            <div class="sidebar-widget">
                                <h2><i class="fas fa-align-justify"></i>Ads 1 column</h2>
                                <div class="image">
                                    <a href=""><img src={process.env.REACT_APP_PUBLIC_URL + '/img/adds-1.jpg'} alt="Image"/></a>
                                </div>
                            </div>

                            <div class="sidebar-widget">
                                <h2><i class="fas fa-align-justify"></i>Ads 2 column</h2>
                                <div class="image">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <a href=""><img src={process.env.REACT_APP_PUBLIC_URL + '/img/adds-2.jpg'} alt="Image"/></a>
                                        </div>
                                        <div class="col-sm-6">
                                            <a href=""><img src={process.env.REACT_APP_PUBLIC_URL + '/img/adds-2.jpg'} alt="Image"/></a>
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
