import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const EmployeeModel = (Shop?: any, ChargeEmployee?: any, Business?: any) => {
    const Employee = sequelize.define('Employee', {
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
        shopId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Shop,
                key: 'id'
            }
        },
        fixed_payment: {
            type: (Sequelize as any).BOOLEAN
        },
        fixed_payment_value: {
            type: (Sequelize as any).FLOAT
        },
        chargeId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ChargeEmployee,
                key: 'id'
            }
        },
        businessId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Business,
                key: 'id'
            }
        }
    }, {});

    return Employee
}

