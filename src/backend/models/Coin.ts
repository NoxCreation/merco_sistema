import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CoinModel = (Business?: any) => {
    const Coin = sequelize.define('Coin', {
        active: {
            type: (Sequelize as any).BOOLEAN
        },
        symbol: {
            type: (Sequelize as any).STRING
        },
        value_change: {
            type: (Sequelize as any).FLOAT
        },
        canRemove: {
            type: (Sequelize as any).BOOLEAN,
            defaultValue: true
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return Coin
}

