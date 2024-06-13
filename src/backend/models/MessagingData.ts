import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const MessagingDataModel = (Employee?: any, Messenger?: any) => {
    const MessagingData = sequelize.define('MessagingData', {
        sponsorId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        messengerId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Messenger,
                key: 'id'
            }
        },
        client_name: {
            type: (Sequelize as any).STRING
        },
        cost: {
            type: (Sequelize as any).FLOAT
        },
        phone: {
            type: (Sequelize as any).STRING
        },
        delivery_date: {
            type: (Sequelize as any).DATE
        },
        end_time: {
            type: (Sequelize as any).TIME
        },
        address: {
            type: (Sequelize as any).STRING
        }
    }, {});

    return MessagingData
}

