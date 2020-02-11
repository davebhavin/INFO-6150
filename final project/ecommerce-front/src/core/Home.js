import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Live Laugh Life"
            description="Live Laugh Life is an E-commerce website that sells handicrafts made by children of various NGOs as an initiative to stop Child Labor. 
            This is an aid which will help in getting their day to day meals arranged for themselves and their families."
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4"style={{fontFamily: "geneva", fontWeight: "bold", color:"Purple"}}>New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((products, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card products={products} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((products, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card products={products} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
