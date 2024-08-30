import DataTypes from "sequelize";
import db from "../../config/database.js"; 

const Role = db.define('role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
}, {timestamps: false});


const Person = db.define('person', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
},{ timestamps: false });


const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    defaultValue: 2
  },
  person_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'id',
    },
    onDelete: 'CASCADE'
  }
});


const AccessToken = db.define('access_token', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  expiration: {
    type: DataTypes.DATE,
    allowNull: false
  }
},{ timestamps: false });


const Category = db.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});


const Dish = db.define('dish', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  weight: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  calories : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  proteins : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  carbohydrates : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  fats : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  saturated_fats : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  sugars : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  dietary_fiber : {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
});

const OrderStatus = db.define('order_status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
},{ timestamps: false });

const Order = db.define('orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_status_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.DECIMAL
  }
});

const OrderDetails = db.define('order_details', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.INTEGER
  }
},{ timestamps: false });

const DishStatus = db.define('dish_status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
},{ timestamps: false });

const MenuDishes = db.define('menu_dishes', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  dish_status_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{ timestamps: false });

// Definición de relaciones

Person.hasOne(User, { foreignKey: 'person_id' });
User.belongsTo(Person, { foreignKey: 'person_id' });

Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

User.hasMany(AccessToken, { foreignKey: 'user_id' });
AccessToken.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Dish, { foreignKey: 'category_id' });
Dish.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

OrderStatus.hasMany(Order, { foreignKey: 'order_status_id' });
Order.belongsTo(OrderStatus, { foreignKey: 'order_status_id' });

Order.belongsToMany(Dish, { through: 'order_details', foreignKey: 'order_id' });
Dish.belongsToMany(Order, { through: 'order_details', foreignKey: 'dish_id' });

User.belongsToMany(Dish, { through: 'menu_dishes', foreignKey: 'user_id' });
Dish.belongsToMany(User, { through: 'menu_dishes', foreignKey: 'dish_id' });

DishStatus.hasMany(MenuDishes, { foreignKey: 'dish_status_id' });
MenuDishes.belongsTo(DishStatus, { foreignKey: 'dish_status_id' });

Dish.hasMany(MenuDishes, { foreignKey: 'dish_id' });
MenuDishes.belongsTo(Dish, { foreignKey: 'dish_id' });

Order.hasMany(OrderDetails, { foreignKey: 'order_id' });
OrderDetails.belongsTo(Order, { foreignKey: 'order_id' });

Dish.hasMany(OrderDetails, { foreignKey: 'dish_id' });
OrderDetails.belongsTo(Dish, { foreignKey: 'dish_id' });

OrderStatus.hasMany(Order, { foreignKey: 'order_status_id' });
Order.belongsTo(OrderStatus, { foreignKey: 'order_status_id' });

export { Role, Person, User, AccessToken, Category, Dish, OrderStatus, Order, OrderDetails, DishStatus, MenuDishes };