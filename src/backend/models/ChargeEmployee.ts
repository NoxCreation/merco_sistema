import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ChargeEmployeeModel = (Business?: any) => {
    const ChargeEmployee = sequelize.define('ChargeEmployee', {
        canRemove: {
            type: (Sequelize as any).BOOLEAN,
            defaultValue: true
        },
        name: {
            type: (Sequelize as any).STRING
        },
        description: {
            type: (Sequelize as any).STRING
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        },
    }, {});

    return ChargeEmployee
}

