import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "@/src/types/types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    //THIS FUNCTION WILL CHECK IF THERE IS AN ITEM AND ADD NOT CREATING A NEW LINE
    const existingItem = items.find(
      (item) => item.product === product && item.size === size,
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount },
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider value={{ items, onAddItem: addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
