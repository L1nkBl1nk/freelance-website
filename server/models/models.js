const sequelize = require('../db')
const {DataTypes} = require ('sequelize')

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: {type :DataTypes.STRING},
  role: {
    type: DataTypes.ENUM('client', 'freelancer'),
    allowNull: false
  }
});

const Profile = sequelize.define('Profile', {
  bio: DataTypes.TEXT,
  skills: DataTypes.STRING,
  img: {type: DataTypes.STRING},
  hourlyRate: DataTypes.FLOAT
});

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false }
});

const Project = sequelize.define('Project', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  img: DataTypes.STRING, 
  budget: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'completed'),
    defaultValue: 'open'
  }
});

const Bid = sequelize.define('Bid', {
  price: DataTypes.FLOAT,
  message: DataTypes.TEXT
});

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
});

const Message = sequelize.define('Message', {
  content: { type: DataTypes.TEXT, allowNull: false }
});

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false }, // 1–5
  comment: DataTypes.TEXT
});

// User <-> Profile
User.hasOne(Profile);
Profile.belongsTo(User);

// User <-> Projects
User.hasMany(Project);
Project.belongsTo(User);

// Category <-> Projects
Category.hasMany(Project);
Project.belongsTo(Category);

// User <-> Bids
User.hasMany(Bid);
Bid.belongsTo(User);

// Project <-> Bids
Project.hasMany(Bid);
Bid.belongsTo(Project);

// Order (создаётся из Bid)
Bid.hasOne(Order);
Order.belongsTo(Bid);

// Order -> клиент и фрилансер
Order.belongsTo(User, { as: 'client' });
Order.belongsTo(User, { as: 'freelancer' });

// Messages (чат внутри заказа)
Order.hasMany(Message);
Message.belongsTo(Order);

User.hasMany(Message);
Message.belongsTo(User);

// Reviews (после выполнения заказа)
Order.hasMany(Review);
Review.belongsTo(Order);

// кто кого оценил
Review.belongsTo(User, { as: 'reviewer' });
Review.belongsTo(User, { as: 'targetUser' });

module.exports = {
  User,
  Profile,
  Category,
  Project,
  Bid,
  Order,
  Message,
  Review
};