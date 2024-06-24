import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const MessengerModel = (Business?: any) => {
    const Messenger = sequelize.define('Messenger', {
        first_name: {
            type: (Sequelize as any).STRING
        },
        last_name: {
            type: (Sequelize as any).STRING
        },
        ci: {
            type: (Sequelize as any).STRING
        },
        email: {
            type: (Sequelize as any).STRING
        },
        phone: {
            type: (Sequelize as any).STRING
        },
        more_data: {
            type: (Sequelize as any).STRING
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return Messenger
}

