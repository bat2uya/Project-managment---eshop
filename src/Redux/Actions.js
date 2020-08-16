export const ADD_ITEM_IN_CART = "ADD_ITEM_IN_CART";
export const SHOW_CART_DLG = "SHOW_CART_DLG";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const TOGGLE_MENU = "TOGGLE_MENU";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const SET_CHECKEDOUT_ITEMS = "SET_CHECKEDOUT_ITEMS";
export const SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER";
export const GET_MY_ORDERS = "GET_MY_ORDERS";
export const PROFILE = "PROFILE";
export const USER_PROFILE_EDIT = "USER_PROFILE_EDIT"

export const LOGOUT = "LOGOUT";

export const addItemInCart = item => ({
  type: ADD_ITEM_IN_CART,
  payload: item
});
export const showCartDlg = status => ({
  type: SHOW_CART_DLG,
  payload: status
});
export const deleteCartItem = id => ({
  type: DELETE_CART_ITEM,
  payload: id
});
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
  payload: null
});
export const updateCartItemQnt = obj => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: obj
});
export const setCheckedOutItems = items => ({
  type: SET_CHECKEDOUT_ITEMS,
  payload: items
});
export const getMyOrders = items => ({
  type: GET_MY_ORDERS,
  payload: items
});
export const setLoggedInUser = user => ({
  type: SET_LOGGED_IN_USER,
  payload: user
});
export const setProfile = user => ({
  type: SET_LOGGED_IN_USER,
  payload: user
});
export const setProfileEdit = user => ({
  type: USER_PROFILE_EDIT,
  payload: user
});

export const logout = () => ({
  type: LOGOUT
});
