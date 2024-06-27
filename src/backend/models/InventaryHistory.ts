import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const InventaryHistoryModel = (User?: any, Shop?: any, Product?: any, Business?: any) => {
    const InventaryHistory = sequelize.define('InventaryHistory', {
        historyId: {
            type: (Sequelize as any).STRING,
        },
        userId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        action: {
            type: (Sequelize as any).STRING,
        },
        shopToId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Shop,
                key: 'id'
            },
            allowNull: true
        },
        description: {
            type: (Sequelize as any).STRING,
            allowNull: true
        },
        productId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Product,
                key: 'id'
            },
            allowNull: true
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return InventaryHistory
}

