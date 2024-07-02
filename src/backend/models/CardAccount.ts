import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CardAccountModel = (Business?: any, Coin?: any) => {
    const CardAccount = sequelize.define('CardAccount', {
        active: {
            type: (Sequelize as any).BOOLEAN,
            defaultValue: true
        },
        name: {
            type: (Sequelize as any).STRING
        },
        code: {
            type: (Sequelize as any).STRING
        },
        value: { // valor actual en tarjeta
            type: (Sequelize as any).FLOAT
        },
        limit: { // limite establecido
            type: (Sequelize as any).FLOAT
        },
        limit_month: { // valor que tiene en el mes
            type: (Sequelize as any).FLOAT
        },
        flexibility: {
            type: (Sequelize as any).STRING
        },
        percent_flexibility: {
            type: (Sequelize as any).FLOAT
        },
        coinId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Coin,
                key: 'id'
            }
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return CardAccount
}

