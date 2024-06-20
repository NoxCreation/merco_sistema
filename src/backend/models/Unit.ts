import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const UnitModel = (Business?: any) => {
    const Unit = sequelize.define('Unit', {
        canRemove: {
            type: (Sequelize as any).BOOLEAN,
            defaultValue: true
        },
        name: {
            type: (Sequelize as any).STRING
        },
        symbol: {
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

    return Unit
}

