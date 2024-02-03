import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/Reset.css';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Review from './pages/Review';
import Food from './pages/Food';
import MapTest from './pages/MapTest';
import Map from './pages/Map';
declare global {
    interface Window {
        naver: any;
    }
}

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header />
                <div className='body'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/Home' element={<Home />} />
                        <Route path='/Review' element={<Review />} />
                        <Route path='/Food' element={<Food />} />
                        <Route path='/MapTest' element={<MapTest />} />
                        <Route path='/getMap' element={<Map />} />
                    </Routes>
                </div>
                <Footer />
                {/* <MapTest /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
