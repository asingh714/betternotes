import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../components/button/button.component";
import Notes from "../../components/notes/notes.component";
import { getCartItems } from "../../redux/actions/cart.actions";

import "./Cart.styles.scss";

function Cart({ getCartItems, cart, total, isCheckout }) {
  const intialCount = Number(cart.length) || 0;
  const [count, setCount] = useState(intialCount);
  const [cartTotal, setCartTotal] = useState(total);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
    setCartTotal(total);
  }, [getCartItems, count, total]);

  return (
    <div className="cart-container">
      {isCheckout ? <h2>Checkout</h2> : <h2>Shopping Cart</h2>}
      {cart && (
        <div className="notes-subtotal-container">
          <Notes
            notes={cart}
            notesStyle="notes-dashboard"
            noteStyle="wide-cart"
          />
          {cartTotal > 0 ? (
            <div className="notes-right-container">
              <h3>Subtotal: ${cartTotal}</h3>
              {!isCheckout && (
                <Button
                  buttonStyle="xlarge-bluefour-btn"
                  handleSubmit={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              )}
            </div>
          ) : (
            <span>Cart is empty </span>
          )}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, { getCartItems })(Cart);
