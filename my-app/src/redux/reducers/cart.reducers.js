import {
  ADD_CART_ITEM_START,
  ADD_CART_ITEM_SUCCESS,
  ADD_CART_ITEM_FAILURE,
  GET_CART_ITEMS_START,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILURE,
  REMOVE_CART_ITEMS_START,
  REMOVE_CART_ITEMS_SUCCESS,
  REMOVE_CART_ITEMS_FAILURE,
} from "../actions/cart.actions";

const initialState = {
  isGettingCartItems: false,
  hasReceivedCartItems: false,
  errorGettingItems: "",
  cart: [],
  total: 0.0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        total: action.payload.reduce((sum, item) => item.price + sum, 0),
      };
    case GET_CART_ITEMS_START:
      return {
        ...state,
        cart: [],
        isGettingCartItems: true,
        hasReceivedCartItems: false,
        errorGettingItems: "",
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        total: action.payload.reduce((sum, item) => item.price + sum, 0),
        isGettingCartItems: false,
        hasReceivedCartItems: true,
        errorGettingItems: "",
      };
    case GET_CART_ITEMS_FAILURE:
      return {
        ...state,
        cart: [],
        isGettingCartItems: false,
        hasReceivedCartItems: false,
        errorGettingItems: "There was an error while getting the cart items",
      };
    case REMOVE_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        total: action.payload.reduce((sum, item) => item.price + sum, 0),
      };
    default:
      return state;
  }
};

export default cartReducer;
