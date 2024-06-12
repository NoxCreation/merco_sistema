import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const InventoryModel = (Product?: any, Stock?: any, ValueCoin?: any) => {
    const Inventory = sequelize.define('Inventory', {
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
        },
        stockId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Stock,
                key: 'id'
            }
        },
    }, {});

    return Inventory
}

