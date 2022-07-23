import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
export default class TopHeader extends React.Component {

    render(){
        return(
            <div class="top-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-3 col-md-4">
                        <div class="logo">
                            <a href="/" class="title">
                            {/* <img src={process.env.REACT_APP_PUBLIC_URL + '/img/logo.png'} alt="Logo"/> */}
                                Translator's Digest
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-4">
                        <div class="search">
                            <form action="search">
                                <input type="text" name="keyword" placeholder="Search"/>
                                <button><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4">
                        <div class="social">
                            <a href=""><i class="fab fa-twitter"></i></a>
                            <a href=""><i class="fab fa-facebook"></i></a>
                            <a href=""><i class="fab fa-linkedin"></i></a>
                            <a href=""><i class="fab fa-instagram"></i></a>
                            <a href=""><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}    
