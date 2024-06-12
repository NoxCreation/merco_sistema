import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CoinModel = () => {
    const Coin = sequelize.define('Coin', {
        active: {
            type: (Sequelize as any).BOOLEAN
        },
        symbol: {
            type: (Sequelize as any).STRING
        },
        value_change: {
            type: (Sequelize as any).FLOAT
        }
    }, {});

    return Coin
}

