import { Sequelize } from "sequelize";
import db from "../config/Database.js";

//kita perlu import UserModel
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "product", // nama table
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, //akan degenerate otomatis oleh sequelize
      allowNull: false, //artinya filed ini tidak boleh kosong
      validate: {
        // field ini tidak boleh bernilai null dan tidak boleh string
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, //artinya filed ini tidak boleh kosong
      validate: {
        // field ini tidak boleh bernilai null dan tidak boleh string
        notEmpty: true,
        len: [3, 100], // jumlah karakter minimal 3 max 100 karakter
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, //artinya filed ini tidak boleh kosong
      validate: {
        // field ini tidak boleh bernilai null dan tidak boleh string
        notEmpty: true,
      },
    },
    //forgnkey
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, //artinya filed ini tidak boleh kosong
      validate: {
        // field ini tidak boleh bernilai null dan tidak boleh string
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true, // opsi
  }
);

//one to many
Users.hasMany(Products);
//many to one
Products.belongsTo(Users, { foreignKey: "userId" });

export default Products;
