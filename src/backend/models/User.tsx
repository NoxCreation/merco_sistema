import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const UserModel = () => {
    const User = sequelize.define('User', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
        }
    }, {});

    return User
}