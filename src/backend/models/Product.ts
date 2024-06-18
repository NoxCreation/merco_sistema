import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ProductModel = (Category?: any, Unit?: any, Shop?: any, Business?: any) => {
    const Product = sequelize.define('Product', {
        image: {
            type: (Sequelize as any).STRING
        },
        code: {
            type: (Sequelize as any).INTEGER
        },
        name: {
            type: (Sequelize as any).TEXT
        },
        categoryId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
        coste_usd: {
            type: (Sequelize as any).FLOAT
        },
        price_usd: {
            type: (Sequelize as any).FLOAT
        },
        count_unit: {
            type: (Sequelize as any).FLOAT
        },
        unitId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Unit,
                key: 'id'
            }
        },
        gain_rate: {
            type: (Sequelize as any).BOOLEAN
        },
        rate_seller: {
            type: (Sequelize as any).FLOAT
        },
        rate_sponsor: {
            type: (Sequelize as any).FLOAT
        },
        barcode: {
            type: (Sequelize as any).TEXT
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business, 
                key: 'id'
            }
        }
    }, {});

    return Product
}

