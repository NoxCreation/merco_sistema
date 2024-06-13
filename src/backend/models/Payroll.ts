import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const PayrollModel = (Employee?: any) => {
    const Payroll = sequelize.define('Payroll', {
        date_from: {
            type: (Sequelize as any).DATE
        },
        date_to: {
            type: (Sequelize as any).DATE
        },
        employeeId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        type_payment: {
            type: (Sequelize as any).STRING
        },
        amount: {
            type: (Sequelize as any).FLOAT
        }
    }, {});

    return Payroll
}

