import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const OrderModel = (MessagingData?: any, StorePickUpData?: any, Sale?: any) => {
    const Order = sequelize.define('Order', {
        order_id: {
            type: (Sequelize as any).STRING
        },
        type: {
            type: (Sequelize as any).STRING
        },
        messaging_data_id: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: MessagingData,
                key: 'id'
            }
        },
        store_pickup_data_id: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: StorePickUpData,
                key: 'id'
            }
        },
        amortized: {
            type: (Sequelize as any).BOOLEAN
        },
        saleId: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: Sale,
                key: 'id'
            }
        }
    }, {});

    return Order
}

