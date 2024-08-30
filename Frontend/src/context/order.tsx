"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { OrderDetail } from "../types/dish";
import Cookies from "js-cookie";

// Props
interface Props {
  children: ReactNode;
}

type orderContextType = {
  order: OrderDetail[];
  addtoOrder: (dish: OrderDetail) => void;
  removeFromOrder: (dish: OrderDetail) => void;
  clearOrder: (dish: OrderDetail) => void;
  clearAllOrders: () => void;
};
const initialContextTypes = {
  order: [],
  addtoOrder: () => {},
  removeFromOrder: () => {},
  clearOrder: () => {},
  clearAllOrders: () => {},
};

// Context
export const OrderContext =
  createContext<orderContextType>(initialContextTypes);

// Provider
export function OrderProvider({ children }: Props) {
  const [order, setOrder] = useState<OrderDetail[]>([]);

  useEffect(() => {
    const storedOrders = Cookies.get("orders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        if (Array.isArray(parsedOrders)) {
          setOrder(parsedOrders);
        }
      } catch (error) {
        console.error('Error al obtener las ordenes":', error);
      }
    }
  }, []);

  useEffect(() => {
    if (order.length > 0) {
      Cookies.set("orders", JSON.stringify(order), { expires: 7 });
    }
  }, [order]);

  // Add new Dish
  const addtoOrder = (dish: OrderDetail) => {
    const dishInOrder = order.findIndex(
      (item: OrderDetail) => item.dish_id === dish.dish_id
    );

    if (dishInOrder >= 0) {
      const newOrder = structuredClone(order);

      newOrder[dishInOrder].count += 1;
      return setOrder(newOrder);
    }

    // Platillo no esta en el carrito
    setOrder((prevState) => [
      ...prevState,
      {
        ...dish,
        count: 1,
      },
    ]);
  };

  const removeFromOrder = (dish: OrderDetail) => {
    const dishInOrder = order.findIndex(
      (item: OrderDetail) => item.dish_id === dish.dish_id
    );
    const Order = structuredClone(order);

    if (dishInOrder >= 0 && Order[dishInOrder].count > 1) {
      Order[dishInOrder].count -= 1;
      return setOrder(Order);
    }

    // Platillo eliminado
    setOrder((prevState) =>
      prevState.filter((item: OrderDetail) => item.dish_id !== dish.dish_id)
    );
  };

  const clearOrder = (dish: OrderDetail) => {
    setOrder((prevState) =>
      prevState.filter((item: OrderDetail) => item.dish_id !== dish.dish_id)
    );
  };

  const clearAllOrders = () => {
    setOrder([]);
    Cookies.remove("orders");
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        addtoOrder,
        removeFromOrder,
        clearOrder,
        clearAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
