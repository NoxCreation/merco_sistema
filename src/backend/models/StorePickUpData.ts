import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const StorePickUpDataModel = (Employee?: any) => {
    const StorePickUpData = sequelize.define('StorePickUpData', {
        sponsorId: {
            type: (Sequelize as any).INTEGER,
            allowNull: true,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        client_name: {
            type: (Sequelize as any).STRING
        },
        phone: {
            type: (Sequelize as any).STRING
        },
        date_pickup: {
            type: (Sequelize as any).DATE
        },
        end_time: {
            type: (Sequelize as any).TIME
        },
    }, {});

    return StorePickUpData
}

