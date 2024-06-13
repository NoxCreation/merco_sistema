import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const TransitModel = (MessagingData?: any, DebtData?: any, Sale?: any, Order?: any) => {
    const Transit = sequelize.define('Transit', {
        transit_id: {
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
        debt_data_id: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: DebtData,
                key: 'id'
            }
        },
        delivery_date: {
            type: (Sequelize as any).DATE
        },
        amortized: {
            type: (Sequelize as any).BOOLEAN
        },
        orderId: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: Order,
                key: 'id'
            }
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

    return Transit
}

