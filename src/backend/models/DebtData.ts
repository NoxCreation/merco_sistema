import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const DebtDataModel = () => {
    const DebtData = sequelize.define('DebtData', {
        client_name: {
            type: (Sequelize as any).STRING
        },
        phone: {
            type: (Sequelize as any).STRING
        },
        email: {
            type: (Sequelize as any).STRING,
            allowNull: true
        },
        delivery_date: {
            type: (Sequelize as any).DATE
        },
        delivery_cancellation:{
            type: (Sequelize as any).DATE,
        },
        amortization: {
            type: (Sequelize as any).FLOAT
        }
    }, {});

    return DebtData
}

