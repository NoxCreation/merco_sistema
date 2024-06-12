import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ProductModel = (Category?: any, Unit?: any) => {
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
                model: Unit, // 'Users' would also work
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
        }
    }, {});

    return Product
}
