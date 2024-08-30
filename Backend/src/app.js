import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// models and routes
import RoleModel from "./models/role.js";
import UserModel from "./models/user.js";
import CategoryModel from "./models/category.js";
import RoleRouter from "./routes/roleRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import LoginRouter from "./routes/loginRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";
import DishRouter from "./routes/dishRoutes.js";
import OrderStatusRouter from "./routes/orderStatusRoutes.js";
import OrderStatusModel from "./models/orderStatus.js";
import OrderRouter from "./routes/orderRoutes.js";
import DishStatusRouter from "./routes/dishStatusRoutes.js";
import MenuDishesRouter from "./routes/menuDishesRoutes.js";
import DishModel from "./models/dish.js";
import OrderModel from "./models/order.js";
import DishStatusModel from "./models/dishStatus.js";
import MenuDishesModel from "./models/menuDishes.js";
import swaggerDocs from "../documentation/swagger.js";
import { corsMiddlewares } from "./Middlewares/cors.js";
import cookieParser from "cookie-parser";
import LogoutRouter from "./routes/logoutRoutes.js";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(json());
app.use(corsMiddlewares());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

app.use("/api/login", LoginRouter({ userModel: UserModel }));
app.use("/api/logout", LogoutRouter({ userModel: UserModel }));
app.use("/api/roles", RoleRouter({ roleModel: RoleModel }));
app.use("/api/users", UserRouter({ userModel: UserModel }));
app.use("/api/categories", CategoryRouter({ categoryModel: CategoryModel }));
app.use("/api/dishes", DishRouter({ dishModel: DishModel }));
app.use(
  "/api/dishes/images",
  express.static(join(CURRENT_DIR, "../src/public/images/dishes"))
);
app.use(
  "/api/orderStatus",
  OrderStatusRouter({ orderStatusModel: OrderStatusModel })
);
app.use("/api/orders", OrderRouter({ orderModel: OrderModel }));
app.use(
  "/api/dishStatus",
  DishStatusRouter({ dishStatusModel: DishStatusModel })
);
app.use(
  "/api/menuDishes",
  MenuDishesRouter({ menuDishesModel: MenuDishesModel })
);

app.listen(process.env.PORT, () => {
  console.log(`Server listening`);
  swaggerDocs(app, process.env.PORT);
});

export default app;
