import { useState, useEffect } from "react";

import { connect } from "react-redux";

import Notes from "../../components/notes/notes.component";
import { getCartItems } from "../../redux/actions/cart.actions";

import "./Cart.styles.scss";

function Cart({ getCartItems, cart }) {
  const intialCount = Number(cart.length) || 0;
  const [count, setCount] = useState(intialCount);
  useEffect(() => {
    getCartItems();
  }, [getCartItems, count]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart && (
        <div className="notes-subtotal-container">
          <Notes
            notes={cart}
            notesStyle="notes-dashboard"
            noteStyle="wide-cart"
          />
          <div className="notes-right-container">
            <h3>Subtotal:</h3>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, { getCartItems })(Cart);
