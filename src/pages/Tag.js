import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect,useParams} from 'react';
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";

import Footer from '../components/Footer'
import FooterButton from '../components/FooterButton'
import Articles from "../components/ArticleList";

export default class Tag extends React.Component {
    
constructor(props) {
        super(props);
        // Don't call this.setState() here!
        console.log("match",this.props.match);
        //  let { id } = this.props.params;
        this.state = { 
            article:{}
        };
        //this.handleClick = this.handleClick.bind(this);
    }
   
    render(){
        return(
            <>
            <div>
                <TopHeader/>
                <Header/>
                <Articles/>
                <Footer/>
                <FooterButton/>
            </div>
      
            <Outlet />
          </>
        )
    }
}
