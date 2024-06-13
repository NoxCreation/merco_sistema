import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const SMSHistoryModel = (Employee?: any) => {
    const SMSHistory = sequelize.define('SMSHistory', {
        sms_id: {
            type: (Sequelize as any).STRING
        },
        action: {
            type: (Sequelize as any).STRING
        },
        sms: {
            type: (Sequelize as any).STRING
        },
        targetId: {
            type: (Sequelize as any).INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        }
    }, {});

    return SMSHistory
}

