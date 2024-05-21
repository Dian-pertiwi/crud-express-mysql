import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users", // nama table
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
    email: {
      type: DataTypes.STRING,
      allowNull: false, //artinya filed ini tidak boleh kosong
      validate: {
        // field ini tidak boleh bernilai null dan tidak boleh string
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, //artinya filed ini tidak boleh kosong
      validate: {
        // field ini tidak boleh bernilai null dan tidak boleh string
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
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

export default Users;
