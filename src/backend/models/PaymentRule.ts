import { Sequelize } from "sequelize";
import { sequelize } from "./engine";

export const PaymentRuleModel = () => {
    const PaymentRule = sequelize.define('PaymentRule', {
        sponser_unit: {
            type: (Sequelize as any).FLOAT
        },
        seller_unit: {
            type: (Sequelize as any).FLOAT
        }
    }, {});

    return PaymentRule
}

