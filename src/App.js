import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css'
import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Section from "./components/switch/section";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Section/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
