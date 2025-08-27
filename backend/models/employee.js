import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM(
            "intern",
            "developer",
            "designer",
            "data analyst"
        ),
        allowNull: false,
        defaultValue: "intern"
    },
    salary: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    tableName: 'employees',
    timestamps: false // Disable automatic timestamp columns
})

export default Employee;