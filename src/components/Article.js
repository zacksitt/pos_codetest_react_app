import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            article:{}
        };
        //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div class="cn-img article-card">
                <img src={this.props.article.picture} />
                <div class="cn-content">
                    <div class="cn-content-inner">
                        <a class="cn-date" href=""><i class="far fa-clock"></i>{(new Date(this.props.article.created_at)).toLocaleDateString()}</a>
                        <a class="cn-title" href={'/detail/' + this.props.article.id + '/' + this.props.article.title}>{this.props.article.title}</a>
                    </div>
                </div>
            </div>
        )
    }
}    
