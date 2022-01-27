import { useState, useEffect } from "react";

import { connect } from "react-redux";

import Notes from "../../components/notes/notes.component";
import { getCartItems } from "../../redux/actions/cart.actions";

import "./Cart.styles.scss";

function Cart({ getCartItems, cart }) {
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);
  return (
    <div className="cart-container">
      {cart && (
        <Notes notes={cart} notesStyle="notes-forSale" noteStyle="forSale" />
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
