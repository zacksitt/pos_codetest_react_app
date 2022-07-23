import { Outlet, Link } from "react-router-dom";
import React,{useRef,useState,useEffect} from 'react';
export default class Header extends React.Component {

    render(){
           return (
                // <!-- Header Start -->
                <div class="header">
                <div class="container">
                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                        <a href="#" class="navbar-brand">MENU</a>
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div class="navbar-nav m-auto">
                                
                                <a href="/" class="nav-item nav-link active">Home</a>
                                <a href="/latest" class="nav-item nav-link">Latest</a>
                                <a href="/popular" class="nav-item nav-link">Popular</a>
                                <a href="/about-us" class="nav-item nav-link">About us</a>
                                <a href="/contact-us" class="nav-item nav-link">Contact us</a>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            // <!-- Header End -->
           )
        
    }
}    
