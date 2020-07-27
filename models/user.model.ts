import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const User = sequelize.define('User',
  {
    // Model attributes
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'zip_code'
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_picture_url'
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    // Sequelize options for this model
    tableName: 'users',
    timestamps: true,
    createdAt: false,
    updatedAt: false
  }
);

export default User;