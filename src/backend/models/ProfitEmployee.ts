import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ProfitEmployeeModel = (Employee?: any, ValueCoin?: any) => {
    const ProfitEmployee = sequelize.define('ProfitEmployee', {
        employeeId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        valueId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
        },
    }, {});

    return ProfitEmployee
}

