import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const BalanceModel = () => {
    const Balance = sequelize.define('Balance', {
        date_from: {
            type: (Sequelize as any).DATE
        },
        date_to: {
            type: (Sequelize as any).DATE
        },
        total_salaries: {
            type: (Sequelize as any).FLOAT
        }
    }, {});

    return Balance
}

