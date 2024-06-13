import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const DailyDebtModel = (ValueCoin?: any) => {
    const DailyDebt = sequelize.define('DailyDebt', {
        amountId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: ValueCoin,
                key: 'id'
            }
        },
        description: {
            type: (Sequelize as any).STRING
        }
    }, {});

    return DailyDebt
}

