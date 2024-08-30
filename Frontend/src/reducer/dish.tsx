import { Categories, MenuDish } from "../types/dish";

export const DISH_ACTION_TYPES = {
  GET_DISHES: "GET_DISHES",
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_DISHES_BY_CATEGORY_ID: "GET_DISHES_BY_CATEGORY_ID",
} as const;

interface GetDishesAction {
  type: typeof DISH_ACTION_TYPES.GET_DISHES;
  payload: MenuDish[];
}

interface GetCategoriesAction {
  type: typeof DISH_ACTION_TYPES.GET_CATEGORIES;
  payload: Categories[];
}

interface GetDishesByCategoryIdAction {
  type: typeof DISH_ACTION_TYPES.GET_DISHES_BY_CATEGORY_ID;
  payload: number;
}

type DishAction =
  | GetDishesAction
  | GetCategoriesAction
  | GetDishesByCategoryIdAction;

interface DishState {
  dishes: MenuDish[];
  dishesByCategory: MenuDish[];
  categories: Categories[];
}

const UPDATE_STATE_BY_ACTION = {
  [DISH_ACTION_TYPES.GET_DISHES]: (
    state: DishState,
    action: GetDishesAction
  ) => ({
    ...state,
    dishes: action.payload,
  }),
  [DISH_ACTION_TYPES.GET_CATEGORIES]: (
    state: DishState,
    action: GetCategoriesAction
  ) => ({
    ...state,
    categories: action.payload,
  }),
  [DISH_ACTION_TYPES.GET_DISHES_BY_CATEGORY_ID]: (
    state: DishState,
    action: GetDishesByCategoryIdAction
  ) => ({
    ...state,
    dishesByCategory: state.dishes.filter(
      (dish) => dish.dish.category_id === action.payload
    ),
  }),
};

export const dishReducer = (
  state: DishState,
  action: DishAction
): DishState => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type];
  return action
    ? (updateState as (state: DishState, action: DishAction) => DishState)(
        state,
        action
      )
    : state;
};
