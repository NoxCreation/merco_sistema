import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const OrderProductModel = (Product?: any) => {
    const OrderProduct = sequelize.define('OrderProduct', {
        productId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        count: {
            type: (Sequelize as any).FLOAT
        },
    }, {});

    return OrderProduct
}

