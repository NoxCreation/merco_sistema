import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const InventaryModel = (Product?: any, ValueCoin?: any, Shop?: any, Business?: any) => {
    const Inventary = sequelize.define('Inventary', {
        stock: {
            type: (Sequelize as any).FLOAT,
        },
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
        shopId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Shop,
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

    return Inventary
}

