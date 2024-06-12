import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const HistoryCardAccountModel = (ValueCoin?: any) => {
    const HistoryCardAccount = sequelize.define('HistoryCardAccount', {
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

    return HistoryCardAccount
}

