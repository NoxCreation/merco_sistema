import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const UserModel = (Role?: any, Shop?: any) => {
    const User = sequelize.define('User', {
        first_name: {
            type: (Sequelize as any).STRING
        },
        last_name: {
            type: (Sequelize as any).STRING
        },
        ci: {
            type: (Sequelize as any).STRING
        },
        email: {
            type: (Sequelize as any).STRING
        },
        phone: {
            type: (Sequelize as any).STRING
        },
        roleId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Role,
                key: 'id'
            }
        },
        shopId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Shop,
                key: 'id'
            }
        },
        username: {
            type: (Sequelize as any).STRING
        },
        password_hash: {
            type: (Sequelize as any).STRING,
            allowNull: true
        },
    }, {});

    return User
}

