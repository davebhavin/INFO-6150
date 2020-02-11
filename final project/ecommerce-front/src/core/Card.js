import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  products,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(products.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/products/${products._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View products</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(products, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(products._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(products._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove products
        </button>
      )
    );
  };
  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{products.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={products} url="product" />
        <p className="card-p  mt-2">{products.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {products.price}</p>
        <p className="black-9">Category: {products.category && products.category.name}</p>
        <p className="black-8">Added on {moment(products.createdAt).fromNow()}</p>
        {showStock(products.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
