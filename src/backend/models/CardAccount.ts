import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CardAccountModel = (Coin?: any) => {
    const CardAccount = sequelize.define('Employee', {
        name: {
            type: (Sequelize as any).STRING
        },
        code: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Coin,
                key: 'id'
            }
        },
        value: {
            type: (Sequelize as any).FLOAT
        },
        flexibility: {
            type: (Sequelize as any).STRING
        },
        percent_flexibility: {
            type: (Sequelize as any).FLOAT
        },
    }, {});

    return CardAccount
}

