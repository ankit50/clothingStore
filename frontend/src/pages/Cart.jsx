import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempData = [];
    for (const eachProduct in cartItems) {
      const product = cartItems[eachProduct];
      for (const size in product) {
        if (product[size] > 0) {
          tempData.push({
            _id: eachProduct,
            size: size,
            quantity: product[size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((product, index) => {
          const productData = products.find((prod) => prod._id === product._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {product.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        product._id,
                        product.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={product.quantity}
              />
              <img
                onClick={() => {
                  updateQuantity(product._id, product.size, 0);
                }}
                src={assets.bin_icon}
                className="w-4 m4-4 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
