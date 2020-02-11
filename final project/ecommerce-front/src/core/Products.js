import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Products = props => {
    const [products, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            console.log(data, productId);
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={products && products.name}
            description={products && products.description && products.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {products && products.description && <Card products={products} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card products={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Products;
