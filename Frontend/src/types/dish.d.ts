export interface Dish {
  id?: number;
  name: string;
  price: string;
  description: string;
  weight: string;
  calories: string;
  proteins: string;
  carbohydrates: string;
  fats: string;
  image: string;
  category_id: number;
  category?: Categories;
  saturated_fats?: string;
  sugars?: string;
  dietary_fiber?: string;
}

export interface DishStatus {
  name: string;
}
export interface MenuDish {
  user_id: number;
  dish_id: number;
  dish_status_id: number;
  dish: Dish;
  dish_status: DishStatus;
}

export interface Categories {
  id: number;
  name: string;
}

export interface OrderDetail {
  order_id?: number;
  dish_id: number;
  count: number;
  price: string;
}
