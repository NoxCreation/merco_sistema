import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const CardAccountModel = (HistoryCardAccount?: any) => {
    const CardAccount = sequelize.define('CardAccount', {
        name: {
            type: (Sequelize as any).STRING
        },
        code: {
            type: (Sequelize as any).STRING
        },
        value: {
            type: (Sequelize as any).FLOAT
        },
        flexibility: {
            type: (Sequelize as any).STRING
        },
        percent_flexibility: {
            type: (Sequelize as any).FLOAT
        },
        historyId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: HistoryCardAccount,
                key: 'id'
            }
        },
    }, {});

    return CardAccount
}

