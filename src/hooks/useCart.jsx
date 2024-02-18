import { useEffect, useState } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    setCartItems(!!data ? data : []);
  }, []);
  useEffect(() => {
    if (cartItems !== undefined) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    const newTotalPrice = cartItems?.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addToCart = ({
    productId,
    pathImage,
    salePrice,
    productName,
    unitCountingId,
    categoryId,
    totalValue,
    variantId,
    step,
    discountTypeId,
    oldSalePrice,
    discountValue,
    discountTilte,
    stock,
  }) => {
    if (!cartItems?.find((item) => item.productId === productId))
      setCartItems([
        ...cartItems,
        {
          productId,
          productName,
          pathImage,
          salePrice,
          totalPrice: Math.round(salePrice * totalValue),
          count: unitCountingId === 2 ? 1 : totalValue ? totalValue : 1,
          weight: unitCountingId === 2 && totalValue,
          unitCountingId,
          variantId,
          categoryId,
          step,
          discountTypeId,
          oldSalePrice,
          discountValue,
          discountTilte,
          stock,
        },
      ]);
    else {
      setCartItems(
        cartItems.map((item) => {
          if (item.productId === productId)
            return {
              ...item,
              totalPrice:
                unitCountingId === 2
                  ? Math.round(salePrice * totalValue)
                  : Math.round(salePrice * totalValue),
              count: unitCountingId === 2 ? 1 : item.count + 1,
              weight: unitCountingId === 2 && totalValue,
            };
          else return item;
        })
      );
    }
  };

  const reduceFromCart = ({
    productId,
    pathImage,
    salePrice,
    productName,
    unitCountingId,
    totalValue,
  }) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.productId === productId)
          return {
            ...item,
            totalPrice: Math.round(salePrice * totalValue),
            count: unitCountingId === 2 ? 1 : item.count - 1,
            // count:
            //   unitCountingId !== 2 ? item.count - 1 : totalValue > 0 ? 1 : 0,
            weight: unitCountingId === 2 && totalValue,
          };
        else return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    const filteredCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    // const removedItem = cartItems.find(item => item.productId === productId);
    setCartItems(filteredCart);
  };

  const resetCart = () => {
    localStorage.removeItem("cart");
    const data = JSON.parse(localStorage.getItem("cart"));
    setCartItems(!!data ? data : []);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    resetCart,
    totalPrice,
    reduceFromCart,
  };
};

export default useCart;
