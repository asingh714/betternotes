export const ADD_CART_ITEM_START = "ADD_CART_ITEM_START";
export const ADD_CART_ITEM_SUCCESS = "ADD_CART_ITEM_SUCCESS";
export const ADD_CART_ITEM_FAILURE = "ADD_CART_ITEM_FAILURE";

export const addCartItem = (item) => (dispatch) => {
  dispatch({ type: ADD_CART_ITEM_START });
  const cart = localStorage.getItem("cart");

  try {
    if (cart == null) {
      localStorage.setItem("cart", "[]");
    }
    let old_cart = JSON.parse(localStorage.getItem("cart"));
    const itemExists = old_cart.some(
      (cartItem) => cartItem.unique_note_id === item.unique_note_id
    );
    if (!itemExists) {
      old_cart.push(item);
      localStorage.setItem("cart", JSON.stringify(old_cart));
      dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: old_cart });
    }
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_FAILURE });
  }
};

export const GET_CART_ITEMS_START = "GET_CART_ITEMS_START";
export const GET_CART_ITEMS_SUCCESS = "GET_CART_ITEMS_SUCCESS";
export const GET_CART_ITEMS_FAILURE = "GET_CART_ITEMS_FAILURE";

// display cart items;
export const getCartItems = () => (dispatch) => {
  dispatch({ type: GET_CART_ITEMS_START });
  try {
    if (localStorage.getItem("cart") !== null) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: cart });
    } else {
      dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: [] });
    }
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_FAILURE });
  }
};

export const REMOVE_CART_ITEMS_START = "REMOVE_CART_ITEMS_START";
export const REMOVE_CART_ITEMS_SUCCESS = "REMOVE_CART_ITEMS_SUCCESS";
export const REMOVE_CART_ITEMS_FAILURE = "REMOVE_CART_ITEMS_FAILURE";

// remove cart item
export const removeCartItems = (id) => (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEMS_START });

  try {
    if (localStorage.getItem("cart") !== null) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const new_cart = cart.filter((item) => item.unique_note_id !== id);
      localStorage.setItem("cart", JSON.stringify(new_cart));
      dispatch({ type: REMOVE_CART_ITEMS_SUCCESS, payload: new_cart });
    }
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEMS_FAILURE });
  }
};

export const CLEAR_CART_START = "CLEAR_CART_START";
export const CLEAR_CART_SUCCESS = "CLEAR_CART_SUCCESS";
export const CLEAR_CART_FAILURE = "CLEAR_CART_FAILURE";

// Clear cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART_START });
  try {
    if (localStorage.getItem("cart") !== null) {
      localStorage.setItem("cart", "[]");
    }
    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: CLEAR_CART_FAILURE });
  }
};
