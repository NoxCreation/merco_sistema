import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const InventaryModel = (Product?: any, ValueCoin?: any) => {
    const Inventary = sequelize.define('Inventary', {
        productId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        priceId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
        }
    }, {});

    return Inventary
}

