import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();
// Think of ShopContext like a special box where you can put important data (like the shopping cart, user info, or product list),
// and then let any component in your app open that box and use the data— without passing it down manually through props.

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliverFee = 100;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const value = {
    products,
    deliverFee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };
  return (
    // fills the box with data and lets other components use it.
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
