export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //caclulate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //caclulate shipping price (if order is over $100 then free else $10 shipping fee)
  state.shippingPrice = addDecimals(state.cartItems > 100 ? 0 : 10);
  //caclulate tax price (15% tax)
  state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed(2));
  //caclulate total price
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
