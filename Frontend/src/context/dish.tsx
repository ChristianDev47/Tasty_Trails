"use client";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { Categories, MenuDish } from "../types/dish.js";
import { dishReducer } from "../reducer/dish";
import { getAllCategories, getMenuDishes } from "../services/dishes";

// Contexto
interface ChatContextProps {
  dishData: {
    dishes: MenuDish[];
    dishesByCategory: MenuDish[];
    categories: Categories[];
  };
  getDishes: () => void;
  getCategories: () => void;
  getDishesByCategoryId: (categoryId: number) => void;
}

export const DishContext = createContext<ChatContextProps | undefined>(
  undefined
);

const dishInitialState = {
  dishes: [] as MenuDish[],
  dishesByCategory: [] as MenuDish[],
  categories: {} as Categories[],
};

function useDish() {
  const [state, dispatch] = useReducer(dishReducer, dishInitialState);

  // CHATS
  const getDishes = async () => {
    try {
      const dishes = await getMenuDishes();
      dispatch({ type: "GET_DISHES", payload: dishes });
    } catch (error) {
      console.error("Error fetching chats and groups:", error);
    }
  };

  const getDishesByCategoryId = (categoryId: number) => {
    if (categoryId) {
      dispatch({ type: "GET_DISHES_BY_CATEGORY_ID", payload: categoryId });
    }
  };

  const getCategories = async () => {
    try {
      const categories = await getAllCategories();
      dispatch({ type: "GET_CATEGORIES", payload: categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDishes();
      await getCategories();
      getDishesByCategoryId(2);
    };
    fetchData();
  }, []);

  return { state, getDishes, getCategories, getDishesByCategoryId };
}

interface DishProviderProps {
  children: ReactNode;
}

export function DishProvider({ children }: DishProviderProps) {
  const { state, getDishes, getCategories, getDishesByCategoryId } = useDish();

  return (
    <DishContext.Provider
      value={{
        dishData: state,
        getDishes,
        getCategories,
        getDishesByCategoryId,
      }}
    >
      {children}
    </DishContext.Provider>
  );
}

DishProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
