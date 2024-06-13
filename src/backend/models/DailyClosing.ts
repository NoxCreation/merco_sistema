import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const DailyClosingModel = (Employee?: any) => {
    const DailyClosing = sequelize.define('DailyClosing', {
        employee_seller_id: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        employee_economic_id: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        },
    }, {});

    return DailyClosing
}

