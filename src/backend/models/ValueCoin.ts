import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ValueCoinModel = (Coin?: any) => {
    const ValueCoin = sequelize.define('ValueCoin', {
        value: {
            type: (Sequelize as any).FLOAT
        },
        coinId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Coin,
                key: 'id'
            }
        },
    }, {});

    return ValueCoin
}

