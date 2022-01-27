export const ADD_CART_ITEM_START = "ADD_CART_ITEM_START";
export const ADD_CART_ITEM_SUCCESS = "ADD_CART_ITEM_SUCCESS";
export const ADD_CART_ITEM_FAILURE = "ADD_CART_ITEM_FAILURE";

export const addCartItem = (item) => (dispatch) => {
  dispatch({ type: ADD_CART_ITEM_START });
  const cart = localStorage.getItem("cart");

  // try {
  if (cart == null) {
    localStorage.setItem("cart", "[]");
  }
  let old_cart = JSON.parse(localStorage.getItem("cart"));
  old_cart.push(item);
  localStorage.setItem("cart", JSON.stringify(old_cart));
  dispatch({ type: ADD_CART_ITEM_SUCCESS });
  // } catch (error) {
  //   dispatch({ type: ADD_CART_ITEM_FAILURE });
  // }
};
