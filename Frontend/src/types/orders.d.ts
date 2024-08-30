export type Order = {
  id?: number;
  user_id?: number;
  order_status_id?: number;
  direction?: string;
  phone?: string;
  total?: string | number;
  createdAt?: Date;
  updatedAt?: Date;
  dishes?: Dish[];
  order_status?: OrderStatus;
};

export type Dish = {
  id?: number;
  name?: string;
  price?: string;
  image?: string;
  order_details?: OrderDetails;
};

export type OrderDetails = {
  count: number;
};

export type OrderStatus = {
  name?: string;
};

export type DishDetail = {
  name: string;
  price: string;
  image: string;
  order_details: OrderDetails;
};
