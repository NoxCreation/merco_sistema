import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const ExpenseModel = (ValueCoin?: any, Business?: any) => {
    const Expense = sequelize.define('Expense', {
        amountId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
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
        }
    }, {});

    return Expense
}

