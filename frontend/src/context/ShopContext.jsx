import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();
// Think of ShopContext like a special box where you can put important data (like the shopping cart, user info, or product list),
// and then let any component in your app open that box and use the data— without passing it down manually through props.

const ShopContextProvider = (props) => {
  const currency = "NPR ";
  const deliverFee = 100;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const addToCart = async (productId, size) => {
    if (!size) {
      size = "M";
    }
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    setCartItems(cartData);
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const eachProduct in cartItems) {
      const product = cartItems[eachProduct];
      for (const size in product) {
        totalCount = totalCount + product[size];
      }
    }
    return totalCount;
  };
  const updateQuantity = async (productId, size, quantity) => {
    let copyCartData = structuredClone(cartItems);
    copyCartData[productId][size] = quantity;
    setCartItems(copyCartData);
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const eachProduct in cartItems) {
      let itemInfo = products.find((product) => product._id === eachProduct);
      for (const item in cartItems[eachProduct]) {
        try {
          if (cartItems[eachProduct][item] > 0) {
            totalAmount += itemInfo.price * cartItems[eachProduct][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };
  const value = {
    products,
    deliverFee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    // fills the box with data and lets other components use it.
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
