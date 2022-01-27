import { useEffect } from "react";
import { connect } from "react-redux";

import { getCartItems } from "../../redux/actions/cart.actions";

import "./Cart.styles.scss";

function Cart({ getCartItems }) {
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
    </div>
  );
}

export default connect(null, { getCartItems })(Cart);
